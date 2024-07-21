import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { IPost } from "../Post";
import axios from "axios";
import uploadImg from "../Services/file-servise";

import useUser from "../Services/UserContext";

function EditPost() {
  const [post, setPost] = useState<IPost>();
  const [imgPreview, setImgPreview] = useState("");
  useEffect(() => {
    if (post?.imgUrl) {
      setImgPreview(post.imgUrl);
    }
  }, [post]);
  const { user, setUser } = useUser();

  const params = useParams();
  const navigate = useNavigate();
  let postId: string = "";
  if (params.postId) {
    postId = params.postId;
  }
  console.log("postId", postId);
  const authorName = user?.userName || user.user?.name;
  useEffect(() => {
    axios.get(`http://localhost:3000/post/${postId}`).then((response) => {
      setPost(response.data);
    });
  }, [postId]);

  const onFormSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log("user", user);
    event.preventDefault();
    const title = (
      document.querySelector('input[name="titleForm"]') as HTMLInputElement
    ).value;
    const content = (
      document.querySelector('textArea[name="contentForm"]') as HTMLInputElement
    ).value;
    const products = (
      document.querySelector(
        'textArea[name="productsForm"]'
      ) as HTMLInputElement
    ).value;
    let imgUrl = imgPreview || post.imgUrl;
    const imgFile = (
      document.querySelector('input[name="imgUrlForm"]') as HTMLInputElement
    ).files?.[0]; // Change to get the file from the input element
    if (imgFile) {
      const uploadResponse: IUploadResponse = await uploadImg(imgFile);
      imgUrl = uploadResponse; // Assuming the response has a url field
    } else if (post?.imgUrl) {
      imgUrl = post.imgUrl;
      setImgPreview(post.imgUrl);
    }
    if (title === "" || content === "" || products === "") {
      alert("Please fill all the fields");
      return;
    }

    const postData = {
      title,
      content,
      products,
      imgUrl,
      authorName,
    };
    console.log("User token:", user.refreshToken); // Debugging: Check the actual token value
    const token = user.refreshToken; //tokens[user.tokens.length - 1]?.accessToken || "fallback-token"; // Fallback token for debugging
    if (!postId) {
      const newPost = axios
        .post("http://localhost:3000/post", postData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          alert("Post created successfully");
          navigate(-1);
        })
        .catch((error) => {
          console.error("Error creating post", error);
        });
      console.log("newPost", newPost);
    } else {
      const postUpdated = axios
        .put(`http://localhost:3000/post/${postId}`, postData, {
          headers: {
            Authorization: `JWT ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          alert("Post updated successfully");
          navigate(-1);
        })
        .catch((error) => {
          console.error("Error updating post", error);
        });
      console.log("postUpdated", postUpdated);
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const uploadResponse = await uploadImg(file); // Assuming uploadImg returns the URL of the uploaded image
        setImgPreview(uploadResponse); // Update the imgPreview state with the new image URL
      } catch (error) {
        console.error("Error uploading image", error);
      }
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          navigate(-1);
        }}
        type="button"
        className="btn btn-outline-secondary"
        style={{
          border: "2px solid #ccc",
          borderRadius: "10px",
          padding: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          margin: "10px",
          background: "white",
        }}
      >
        Back
      </button>

      <form style={{ marginTop: "20px" }}>
        {" "}
        {/* Adds space at the top of the form */}
        <div style={{ marginBottom: "20px" }}>
          {" "}
          {/* Adds space between the title and content fields */}
          <label
            style={{
              display: "block",
              marginBottom: "10px",
              fontFamily: "Arial, sans-serif", // Example font family
              fontSize: "18px", // Example font size
              fontWeight: "bold", // Example font weight
            }}
          >
            Title:
            <input
              type="text"
              name="titleForm"
              defaultValue={post?.title}
              style={{
                flex: "40%",
                border: "2px solid #ccc",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                margin: "10px",
                minWidth: "200px",
                maxWidth: "400px",
                height: "50px",
              }}
              onInput={(e) => {
                e.currentTarget.style.width =
                  (e.target.value.length + 1) * 8 + "px";
              }}
            />
          </label>
        </div>
        <div>
          <label>
            <div style={{ textAlign: "center", margin: "10px" }}>
              <span
                style={{
                  display: "block",
                  marginBottom: "10px",
                  fontFamily: "Arial, sans-serif", // Example font family
                  fontSize: "18px", // Example font size
                  fontWeight: "bold", // Example font weight
                }}
              >
                Content:
              </span>
            </div>
            <textarea
              //type="text"
              name="contentForm"
              defaultValue={post?.content}
              style={{
                flex: "40%",
                border: "2px solid #ccc",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                margin: "10px",
                width: "400px",
                minHeight: "600px",
                overflow: "auto",
              }}
            />
          </label>
          <label>
            <div style={{ textAlign: "center", margin: "10px" }}>
              <span
                style={{
                  display: "block",
                  marginBottom: "10px",
                  fontFamily: "Arial, sans-serif", // Example font family
                  fontSize: "18px", // Example font size
                  fontWeight: "bold", // Example font weight
                }}
              >
                Products:
              </span>

              <textarea
                //type="text"
                name="productsForm"
                defaultValue={post?.products}
                style={{
                  flex: "40%",
                  border: "2px solid #ccc",
                  borderRadius: "10px",
                  padding: "20px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  margin: "10px",
                  width: "200px",
                  height: "600px",
                  overflow: "auto",
                }}
              />
            </div>
          </label>
          <label>
            {imgPreview && (
              <img
                src={imgPreview}
                alt="img"
                style={{ flex: "40%", maxWidth: "400px", maxHeight: "400px" }}
              />
            )}
          </label>
          <label>
            Select Image:
            <input
              type="file"
              name="imgUrlForm"
              defaultValue={post?.imgUrl}
              onChange={handleImageChange}
            />
          </label>
        </div>
      </form>
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={onFormSubmit}
        style={{
          border: "2px solid #ccc",
          borderRadius: "10px",
          padding: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          margin: "10px",
          background: "white",
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default EditPost;
