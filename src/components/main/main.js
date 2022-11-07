import { useEffect, useRef, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { ColorExtractor } from "react-color-extractor";
import Draggable from "react-draggable";

import { getColor } from "reducer/getColor";
import "./main.scss";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";

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
  const imgName = JSON.parse(useSelector((e) => e.name.value));
  const colors = useSelector((e) => e.changeColor.value);
  const imageRef = useRef(null);
  const resImageRef = useRef(null);
  const canvasRef = useRef(null);
  const [value, setValue] = useState(1);

  const dispatch = useDispatch();

  function changeColor(
    ref,
    pixelData,
    newPixelData,
    originalColor,
    targetColor
  ) {
    const ctx = canvasRef.current.getContext("2d");
    if (!pixelData) return;
    var newColor = HexToRGB(targetColor);
    var originColor = HexToRGB(originalColor);

    for (var I = 0, L = pixelData.data.length; I < L; I += 4) {
      if (newPixelData.data[I + 3] > 0) {
        if (
          isInRange(pixelData.data[I], originColor.R, 20) &&
          isInRange(pixelData.data[I + 1], originColor.G, 20) &&
          isInRange(pixelData.data[I + 2], originColor.B, 20)
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
  }, [colors]);
  return (
    <div className="main">
      <div className="slider">
        <Slider
          min={0}
          max={5}
          step={0.1}
          value={value}
          onChange={(e) => {
            setValue(e);
          }}
        />
      </div>
      <Draggable nodeRef={canvasRef}>
        <canvas ref={canvasRef} style={{ width: `${value * 300}px` }} />
      </Draggable>
      {state === true ? (
        <ColorExtractor
          getColors={(e) => {
            dispatch(getColor(e));
            handleChange();
          }}
        >
          <img
            src={imgName ? imgName.preview : ""}
            alt="main"
            ref={imageRef}
            style={{
              visibility: "hidden",
            }}
          />
        </ColorExtractor>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Main;
