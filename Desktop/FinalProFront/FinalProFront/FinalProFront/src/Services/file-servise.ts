import apiClient from "./apiClient";

interface IUploadResponse {
  url: string;
}
const uploadImg = async (picture: File) => {
  return new Promise<string>((resolve, reject) => {
    console.log("Upload Image.." + picture);
    const formData = new FormData();
    if (picture) {
      formData.append("file", picture);
      apiClient
        .post<IUploadResponse>("file?file=123.webp", formData, {
          headers: {
            "Content-Type": "image/jpeg",
          },
        })
        .then((res) => {
          console.log(res);
          resolve(res.data.url);
        })

        .catch((err) => {
          console.log(err);
          reject(err);
        });
    }
  });
};

export default uploadImg;
