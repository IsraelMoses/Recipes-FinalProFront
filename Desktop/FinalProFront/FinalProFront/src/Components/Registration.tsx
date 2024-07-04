import avatar from "../assets/avatar.webp";
import apiClient from "../Services/apiClient.ts";
import React, { useState } from "react";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import uploadImg from "../Services/file-servise.ts";

function Registration() {
  const [imgSrc, setImgSrc] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement>();
  const emailInputRef = useRef<HTMLInputElement>();
  const passwordInputRef = useRef<HTMLInputElement>();
  const imgSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    if (e.target.files && e.target.files.length > 0) {
      setImgSrc(e.target.files[0]);
    }
  };
  const selectImg = () => {
    console.log("Select Image button clicked");
    fileInputRef.current?.click();
  };

  const register = async () => {
    console.log("Register button clicked");
    console.log(emailInputRef.current?.value);
    console.log(passwordInputRef.current?.value);
    const url = await uploadImg(imgSrc!);
    console.log("upload returned: " + url);
  };

  return (
    <div className="vstack gap-2 col-md-5 mx-auto">
      <h1>Registration</h1>
      <div className="d-flex justify-content-center position-relative">
        <img
          src={imgSrc ? URL.createObjectURL(imgSrc) : avatar}
          style={{ height: "250px", width: "200px" }}
          alt="Placeholder Image"
        />
        <button
          type="button"
          className="btn position-absolute bottom-0 end-0"
          onClick={selectImg}
          title="Select Image"
        >
          <FontAwesomeIcon icon={faImage} className="fa-xl" />
        </button>
      </div>

      <input
        style={{ display: "none" }}
        ref={fileInputRef}
        type="file"
        onChange={imgSelected}
        className="form-control"
        id="floatingInput"
      />

      <div className="form-floating">
        <input
          ref={emailInputRef}
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="
                "
        />
        <label htmlFor="floatingInput">Email</label>
      </div>
      <div className="form-floating">
        <input
          ref={passwordInputRef}
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="
                "
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>
      <button type="button" className="btn btn-primary" onClick={register}>
        Register
      </button>
    </div>
  );
}

export default Registration;
