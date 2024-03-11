import { Blocks } from "react-loader-spinner";
const Spinner = () => {
  return (
    <div className=" absolute top-1/2 left-1/2 -translate-x-[50%]  -translate-y-[50%] ">
      <Blocks
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        visible={true}
      />
    </div>
  );
};

export default Spinner;
