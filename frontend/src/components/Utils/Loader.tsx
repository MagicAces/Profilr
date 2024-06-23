import { BarLoader } from "react-spinners";

const Loader = ({ curved = true }: { curved?: boolean }) => {
  return (
    <>
      <div
        className="loader-container"
        style={curved ? { borderRadius: "0.6rem" } : {}}
      >
        <BarLoader width={"auto"} height={8} color="#F0F0F0DD" />
      </div>
    </>
  );
};

export default Loader;
