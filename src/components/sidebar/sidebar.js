import { useState } from "react";
import { useDispatch } from "react-redux";
import { setState } from "../../reducer/imgState";
import { setName } from "../../reducer/imgName";

import { Dropzone, FileItem } from "@dropzone-ui/react";
import { CompactPicker } from "react-color";
import UploadImg from "image/upload.png";
import Gammet from "image/garment-color.png";

import "./sidebar.scss";

const Sidebar = () => {
  const [upload, setUpload] = useState(true);
  const [garment, setGarment] = useState(false);
  const [files, setFiles] = useState([]);
  const [selColor, setSelColor] = useState("");

  const dispatch = useDispatch();
  const updateFiles = (e) => {
    const temp = [];
    setFiles(e);
    e.forEach((element) => {
      temp.push(element.file.name);
    });
    dispatch(setName(temp));
  };

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
          <img src={UploadImg} alt="upload" />
          <p className="sidetext">Upload</p>
        </div>
        <div
          className="icon"
          onClick={() => {
            setGarment(true);
            setUpload(false);
          }}
        >
          <img src={Gammet} alt="garment" style={{ marginTop: "8px" }} />
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
            <button className="upload" onClick={() => dispatch(setState())}>
              Upload
            </button>
          </div>
        ) : (
          <></>
        )}
        {garment === true ? (
          <div className="garmentPage">
            <CompactPicker
              styles={{ width: "100%" }}
              color={selColor}
              onChangeComplete={(e) => setSelColor(e.hex)}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
