import { useState } from "react";

import { Dropzone, FileItem } from "@dropzone-ui/react";
import UploadImg from "image/upload.png";
import Gammet from "image/garment-color.png";

import "./sidebar.scss";

const Sidebar = () => {
  const [upload, setUpload] = useState(false);
  const [garment, setGarment] = useState(false);
  const [files, setFiles] = useState([]);

  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);
  };
  console.log(files);

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
              {files.map((file) => (
                <FileItem {...file} preview />
              ))}
            </Dropzone>
            <button className="upload">Upload</button>
          </div>
        ) : (
          <></>
        )}
        {garment === true ? <div className="garmentPage"></div> : <></>}
      </div>
    </div>
  );
};

export default Sidebar;
