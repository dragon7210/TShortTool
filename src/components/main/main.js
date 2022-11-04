import { useSelector } from "react-redux";

import "./main.scss";

const Main = () => {
  const state = useSelector((e) => e.state.value);
  const imgName = useSelector((e) => e.name.value);

  return (
    <div className="main">
      {state === true ? (
        <img src={`/image/${imgName[imgName.length - 1]}`} alt="image" />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Main;
