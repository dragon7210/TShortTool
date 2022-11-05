import { useSelector, useDispatch } from "react-redux";
import { ColorExtractor } from "react-color-extractor";

import { getColor } from "reducer/getColor";
import "./main.scss";
import { useEffect, useRef } from "react";

function HexToRGB(Hex) {
  var Long = parseInt(Hex.replace(/^#/, ""), 16);
  return {
    R: (Long >>> 16) & 0xff,
    G: (Long >>> 8) & 0xff,
    B: Long & 0xff,
  };
}

function isInRange(a, b, d) {
  return a + d >= b && a - d <= b;
}

const Main = () => {
  const state = useSelector((e) => e.state.value);
  const imgName = useSelector((e) => e.name.value);
  const colors = useSelector((e) => e.changeColor.value);
  const imageRef = useRef(null);
  const resImageRef = useRef(null);
  const canvasRef = useRef(null);
  // const [changeColorset, setChangeColorset] = useState(false);

  const dispatch = useDispatch();

  function changeColor(
    ref,
    pixelData,
    newPixelData,
    originalColor,
    targetColor
  ) {
    const ctx = canvasRef.current.getContext("2d");
    if (!pixelData) return; // Check if image has loaded
    var newColor = HexToRGB(targetColor);
    var originColor = HexToRGB(originalColor);

    for (var I = 0, L = pixelData.data.length; I < L; I += 4) {
      if (newPixelData.data[I + 3] > 0) {
        if (
          isInRange(pixelData.data[I], originColor.R, 51) &&
          isInRange(pixelData.data[I + 1], originColor.G, 51) &&
          isInRange(pixelData.data[I + 2], originColor.B, 51)
        ) {
          newPixelData.data[I] = (pixelData.data[I] / 255) * newColor.R;
          newPixelData.data[I + 1] = (pixelData.data[I + 1] / 255) * newColor.G;
          newPixelData.data[I + 2] = (pixelData.data[I + 2] / 255) * newColor.B;
        }
      }
    }

    ctx.putImageData(newPixelData, 0, 0);
  }

  function getPixels(img) {
    const ctx = canvasRef.current.getContext("2d");
    canvasRef.current.width = img.width;
    canvasRef.current.height = img.height;

    ctx.drawImage(
      img,
      0,
      0,
      img.naturalWidth,
      img.naturalHeight,
      0,
      0,
      img.width,
      img.height
    );
    const data = ctx.getImageData(0, 0, img.width, img.height);

    return data;
  }

  const handleChange = () => {
    if (imageRef && canvasRef && imageRef.current && canvasRef.current) {
      const pixelData = getPixels(imageRef.current);
      const newPixelData = getPixels(imageRef.current);
      changeColor(
        resImageRef,
        pixelData,
        newPixelData,
        colors.selCurColor,
        colors.selColor
      );
    }
  };

  useEffect(() => {
    handleChange();
    // if (Object.keys(colors).length !== 0) {
    //   setChangeColorset(true);
    // }
  }, [colors]);

  return (
    <div className="main">
      <canvas ref={canvasRef} />
      {state === true ? (
        <ColorExtractor
          getColors={(e) => {
            dispatch(getColor(e));
            handleChange();
          }}
        >
          <img
            src={`/image/${imgName[imgName.length - 1]}`}
            alt="main"
            ref={imageRef}
          />
        </ColorExtractor>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Main;
