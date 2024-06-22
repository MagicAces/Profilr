import { useRef } from "react";
import {
  useMenuState,
  useHover,
  ControlledMenu,
  MenuHeader,
} from "@szhsin/react-menu";

import "@szhsin/react-menu/dist/transitions/slide.css";
import "@szhsin/react-menu/dist/index.css";
import { useSelector } from "react-redux";
import Avatar from "react-avatar";

const Profile = ({ logout }: { logout: (id: number) => void }) => {
  const sessionIconRef = useRef(null);
  const [menuState, toggle] = useMenuState({ transition: true });
  const { anchorProps, hoverProps } = useHover(menuState.state, toggle);

  const { userInfo } = useSelector((state: any) => state.auth);

  return (
    <>
      <div
        ref={sessionIconRef}
        {...anchorProps}
        className={
          menuState.state === "open"
            ? `profile-container profile-container-open`
            : `profile-container`
        }
      >
        <Avatar
          className={"profile-container-avatar"}
          src={userInfo?.photo}
          name={userInfo?.username}
          size={"40"}
          round={true}
          maxInitials={1}
          textSizeRatio={0.5}
          textMarginRatio={0.05}
        />
      </div>
      <ControlledMenu
        {...hoverProps}
        {...menuState}
        anchorRef={sessionIconRef}
        onClose={() => toggle(false)}
        transition
        menuClassName={"profile-container-menu"}
        gap={10}
        portal={{
          target: document.querySelector(".navbar-container"),
          stablePosition: true,
        }}
        align="end"
        arrow={false}
      >
        <MenuHeader className={"profile-container-menu-item"}>
          <Avatar
            className={"profile-container-menu-item-left"}
            src={userInfo?.photo}
            name={userInfo?.username}
            size={"100"}
            round={true}
            maxInitials={1}
            textSizeRatio={0.5}
            textMarginRatio={0.05}
          />
          <div className="profile-container-menu-item-right">
            <div className="top">
              <p>{userInfo?.username}</p>
              <span>{userInfo?.email}</span>
            </div>
            <button
              type="button"
              className="bottom"
              onClick={() => logout(userInfo?.id as number)}
            >
              Logout
            </button>
          </div>
        </MenuHeader>
      </ControlledMenu>
    </>
  );
};

export default Profile;
