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
function compareNumbers(a, b) {
  return a - b;
}
// function hexToHSL(H) {
//   // Convert hex to RGB first
//   let r = 0,
//     g = 0,
//     b = 0;
//   if (H.length === 4) {
//     r = "0x" + H[1] + H[1];
//     g = "0x" + H[2] + H[2];
//     b = "0x" + H[3] + H[3];
//   } else if (H.length === 7) {
//     r = "0x" + H[1] + H[2];
//     g = "0x" + H[3] + H[4];
//     b = "0x" + H[5] + H[6];
//   }
//   // Then to HSL
//   r /= 255;
//   g /= 255;
//   b /= 255;
//   let cmin = Math.min(r, g, b),
//     cmax = Math.max(r, g, b),
//     delta = cmax - cmin,
//     h = 0,
//     s = 0,
//     l = 0;

//   if (delta === 0) h = 0;
//   else if (cmax === r) h = ((g - b) / delta) % 6;
//   else if (cmax === g) h = (b - r) / delta + 2;
//   else h = (r - g) / delta + 4;

//   h = Math.round(h * 60);

//   if (h < 0) h += 360;

//   l = (cmax + cmin) / 2;
//   s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
//   s = +(s * 100).toFixed(1);
//   l = +(l * 100).toFixed(1);

//   return "hsl(" + h + "," + s + "%," + l + "%)";
// }

const Main = () => {
  const state = useSelector((e) => e.state.value);
  const imgName = JSON.parse(useSelector((e) => e.name.value));
  const colors = useSelector((e) => e.changeColor.value);
  const allColors = useSelector((e) => e.getColor.value);
  const imageRef = useRef(null);
  const resImageRef = useRef(null);
  const canvasRef = useRef(null);
  const [value, setValue] = useState(1);
  const [min, setMin] = useState({ R: 0, G: 0, B: 0 });
  const [max, setMax] = useState({ R: 0, G: 0, B: 0 });

  const dispatch = useDispatch();

  // console.log(allColors);
  // console.log(hexToHSL(colors.selColor));

  // allColors.forEach((element) => {
  //   console.log(hexToHSL(element));
  // });

  const temp = [];
  allColors.map((ele) => temp.push(HexToRGB(ele).R));
  temp.sort(compareNumbers);
  function Order(ele, colors) {
    if (colors === {}) return;
    ele.map((element, index) => {
      if (element === HexToRGB(colors.selCurColor).R) {
        if (index === 0) {
          setMin({ R: 0, G: 0, B: 0 });
          setMax({ R: element, G: element, B: element });
        } else if (index === 5) {
          setMin({ R: element, G: element, B: element });
          setMax({ R: 255, G: 255, B: 255 });
        } else {
          setMin({
            R: ele[index - 1],
            G: ele[index - 1],
            B: ele[index - 1],
          });
          setMax({
            R: ele[index + 1],
            G: ele[index + 1],
            B: ele[index + 1],
          });
        }
      }
    });
  }
  function isInRange(a, b, c) {
    return b <= a && a <= c;
  }

  function changeColor(ref, pixelData, newPixelData, targetColor) {
    const ctx = canvasRef.current.getContext("2d");
    if (!pixelData) return;

    var newColor = HexToRGB(targetColor);

    for (var I = 0, L = pixelData.data.length; I < L; I += 4) {
      if (newPixelData.data[I + 3] > 0) {
        if (
          isInRange(pixelData.data[I], min.R, max.R) &&
          isInRange(pixelData.data[I + 1], min.G, max.G) &&
          isInRange(pixelData.data[I + 2], min.B, max.B)
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
      changeColor(resImageRef, pixelData, newPixelData, colors.selColor);
    }
  };

  useEffect(() => {
    handleChange();
    Order(temp, colors);
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
          maxColors={2}
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
