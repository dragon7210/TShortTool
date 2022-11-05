import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setState, unState } from "../../reducer/imgState";
import { setName } from "../../reducer/imgName";

import { Dropzone, FileItem } from "@dropzone-ui/react";
import { CompactPicker } from "react-color";
import { setChangeColor } from "reducer/changeColor";

import "./sidebar.scss";

const Sidebar = () => {
  const [upload, setUpload] = useState(true);
  const [garment, setGarment] = useState(false);
  const [files, setFiles] = useState([]);
  const [selColor, setSelColor] = useState("");
  const [selCurColor, setSelCurColor] = useState("");

  const dispatch = useDispatch();
  const updateFiles = (e) => {
    const temp = [];
    setFiles(e);
    e.forEach((element) => {
      temp.push(element.file.name);
    });
    dispatch(setName(temp));
    dispatch(unState());
  };
  const getColors = useSelector((e) => e.getColor.value);
  return (
    <div className="sidebar">
      <div className="left">
        <div
          className="icon"
          onClick={() => {
            setUpload(true);
            setGarment(false);
          }}
        >
          <img src="image/upload.png" alt="upload" />
          <p className="sidetext">Upload</p>
        </div>
        <div
          className="icon"
          onClick={() => {
            setGarment(true);
            setUpload(false);
          }}
        >
          <img
            src="/image/garment-color.png"
            alt="garment"
            style={{ marginTop: "8px" }}
          />
          <p className="sidetext">Garment color</p>
        </div>
      </div>
      <div className="right">
        {upload === true ? (
          <div className="uploadPage">
            <p className="title">Choose a file to upload</p>
            <Dropzone onChange={updateFiles} value={files}>
              {files.map((file, index) => (
                <FileItem key={index} {...file} preview />
              ))}
            </Dropzone>
            <button className="buttonType" onClick={() => dispatch(setState())}>
              Upload
            </button>
          </div>
        ) : (
          <></>
        )}
        {garment === true ? (
          <div className="garmentPage">
            <p>Choose which color to change</p>
            <div className="current">
              {getColors.map((ele, index) =>
                selCurColor !== ele ? (
                  <div
                    className="color"
                    key={index}
                    style={{ backgroundColor: `${ele}` }}
                    onClick={() => setSelCurColor(ele)}
                  />
                ) : (
                  <div
                    className="selCurColor"
                    key={index}
                    style={{ backgroundColor: `${ele}` }}
                    onClick={() => setSelCurColor(ele)}
                  />
                )
              )}
            </div>
            <p>Choose a new color</p>
            <div className="selColor">
              <p>Selected color :</p>
              <div
                className="color"
                style={{
                  backgroundColor: `${selColor}`,
                  marginTop: "3px",
                  marginLeft: "4px",
                }}
              ></div>
            </div>
            <CompactPicker
              styles={{ width: "100%" }}
              color={selColor}
              onChangeComplete={(e) => setSelColor(e.hex)}
            />

            <div>
              <button
                className="buttonType"
                onClick={() =>
                  dispatch(setChangeColor({ selCurColor, selColor: "#FFFFFF" }))
                }
                style={{ marginRight: "20px" }}
              >
                Reset
              </button>
              <button
                className="buttonType"
                onClick={() =>
                  dispatch(setChangeColor({ selCurColor, selColor }))
                }
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
