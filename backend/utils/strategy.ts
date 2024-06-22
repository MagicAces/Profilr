import { PrismaClient } from "@prisma/client";
import { Profile, VerifyCallback } from "passport-google-oauth20";

const prisma = new PrismaClient();

export const googleStrategy = async (
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  cb: VerifyCallback
): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        googleID: profile.id,
      },
    });

    if (!user) {
      const newUser = await prisma.user.create({
        data: {
          googleID: profile.id,
          refreshToken: refreshToken,
          accessToken: accessToken,
          email: profile.emails ? profile.emails[0].value : "",
          lastLogin: new Date(),
          photo: profile.photos ? profile.photos[0].value : "",
          provider: profile.provider,
          username: profile.displayName,
        },
      });

      return cb(null, newUser);
    } else {
      const updatedUser = await prisma.user.update({
        where: {
          googleID: profile.id,
        },
        data: {
          refreshToken,
          accessToken,
          lastLogin: new Date(),
        },
      });

      return cb(null, updatedUser);
    }
  } catch (err) {
    return cb(err as Error);
  }
};
