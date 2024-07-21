import { CredentialResponse as BaseCredentialResponse } from "@react-oauth/google";

interface CredentialResponse extends BaseCredentialResponse {
  password?: string;
}
import apiClient from "./apiClient";

export interface IUser {
  name?: string;
  email: string;
  password?: string;
  imgUrl?: string;
  _id?: string;
  accessToken?: string;
  refreshToken?: string;
}

export const registerUser = (user: IUser) => {
  return new Promise<IUser>((resolve, reject) => {
    console.log("Registering user: ");
    console.log(user);
    apiClient
      .post("/auth/register", user)
      .then((response) => {
        resolve(response.data);
        if (response.data.message) {
          alert("User already exists");
          return;
        }
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};
function promptUserForNewPassword(): Promise<string> {
  return new Promise((resolve, reject) => {
    const newPassword = window.prompt("Please enter your new password:");
    // Basic validation: ensure the password is not empty and meets your criteria
    if (newPassword && newPassword.length >= 8) {
      resolve(newPassword);
    } else {
      reject("Password must be at least 8 characters long.");
    }
  });
}
export const googleSignin = async (credentialResponse: CredentialResponse) => {
  return new Promise<IUser>((resolve, reject) => {
    // Check if the user is already registered with the email
    //promptUserForNewPassword().then((newPassword) => {
    console.log("Google Signin:", credentialResponse);
    //credentialResponse.password = newPassword;

    //console.log("Google Signin:", credentialResponse.password);
    apiClient
      .post("/auth/google", credentialResponse)
      .then((response) => {
        console.log(response.data);
        resolve(response.data);
      })

      .catch((error) => {
        console.error(error + "error in google signin");
        reject(error);
      });
  });
  //});
};
