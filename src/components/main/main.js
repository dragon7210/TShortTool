import { useSelector, useDispatch } from "react-redux";
import { ColorExtractor } from "react-color-extractor";

import { getColor } from "reducer/getColor";
import "./main.scss";

const Main = () => {
  const state = useSelector((e) => e.state.value);
  const imgName = useSelector((e) => e.name.value);

  const dispatch = useDispatch();
  return (
    <div className="main">
      {state === true ? (
        <ColorExtractor getColors={(e) => dispatch(getColor(e))}>
          <img src={`/image/${imgName[imgName.length - 1]}`} alt="image" />
        </ColorExtractor>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Main;
