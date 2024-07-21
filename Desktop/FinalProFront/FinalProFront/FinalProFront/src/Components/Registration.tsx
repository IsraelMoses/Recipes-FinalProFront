import avatar from "../assets/avatar.webp";
import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import uploadImg from "../Services/file-servise.ts";
import { registerUser, IUser } from "../Services/user-service.ts";
import { useNavigate } from "react-router-dom";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { googleSignin } from "../Services/user-service.ts";
import { Link } from "react-router-dom";
import useUser from "../Services/UserContext.tsx";

function Registration() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [imgSrc, setImgSrc] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement>();
  const nameInputRef = useRef<HTMLInputElement>();
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
    if (
      !nameInputRef.current?.value ||
      !emailInputRef.current?.value ||
      !passwordInputRef.current?.value ||
      !imgSrc
    ) {
      alert("Please fill all the fields");
      return;
    }
    if (emailInputRef.current?.value.indexOf("@") === -1) {
      alert("Please enter a valid email");
      return;
    }
    const url = await uploadImg(imgSrc!);
    console.log("upload returned: " + url);
    const userInput: IUser = {
      name: nameInputRef.current?.value,
      email: emailInputRef.current?.value,
      password: passwordInputRef.current?.value,
      imgUrl: url,
    };

    const res = await registerUser(userInput);
    setUser(res);
    console.log("user", user, "   res", res);
    const userName = userInput.name;
    const userEmail = userInput.email;
    const _id = res?._id;
    navigate(`/post-list-handler/${userName}`, {
      state: { userEmail, _id },
    });
  };

  const onGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    try {
      console.log(credentialResponse);
      const res = await googleSignin(credentialResponse);
      console.log(res);
      setUser(res);
      console.log("user", user, "   res", res);
      navigate(`/post-list-handler/${res.userName}`, {
        state: { userEmail: res.email, _id: res._id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  const onGoogleLoginFailure = (credentialResponse: CredentialResponse) => {
    console.log(credentialResponse);
  };
  return (
    <div
      className="vstack gap-2 col-md-5 mx-auto"
      style={{ color: "white", textShadow: "2px 2px 4px #000000" }}
    >
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
          style={{ background: "white" }}
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
      />

      <div className="form-floating">
        <input
          ref={nameInputRef}
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="
                "
        />
        <label htmlFor="floatingInput">Name</label>
      </div>

      <div className="form-floating">
        <input
          ref={emailInputRef}
          type="text"
          className="form-control"
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <GoogleLogin
          onSuccess={onGoogleLoginSuccess}
          onError={onGoogleLoginFailure}
        />
        <div>
          Already registered? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
}

export default Registration;
