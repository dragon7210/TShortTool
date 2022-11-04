import FrontImg from "image/front.png";
import { useSelector } from "react-redux";

import "./main.scss";

const Main = () => {
  const state = useSelector((e) => e.state.value);
  const imgName = useSelector((e) => e.name.value);
  return (
    <div className="main">
      <img src={FrontImg} alt="front" />
    </div>
  );
};

export default Main;
