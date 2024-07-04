import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { IPost } from "../Post";
import axios from "axios";
import uploadImg from "../Services/file-servise";

function EditPost() {
  const [post, setPost] = useState<IPost>();
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    axios.get(`http://localhost:3000/post/${postId}`).then((response) => {
      setPost(response.data);
    });
  }, [postId]);

  const onFormSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
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
    const imgFile = (
      document.querySelector('input[name="imgUrlForm"]') as HTMLInputElement
    ).files?.[0]; // Change to get the file from the input element
    let imgUrl = "";
    if (imgFile) {
      const uploadResponse: IUploadResponse = await uploadImg(imgFile);
      imgUrl = uploadResponse; // Assuming the response has a url field
    }
    if (title === "" || content === "" || products === "" || imgUrl === "") {
      alert("Please fill all the fields");
      return;
    }

    const postData = {
      title,
      content,
      products,
      imgUrl,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjgxMzA2ZDRjZDcwYThmMzQyOGRkZjIiLCJpYXQiOjE3MTk3NDI1OTcsImV4cCI6MTcyNzUxODU5N30.FB4P-o6s8nlDedipZMCtCajzSG0_SPiDHmN2W4SEdkM",
      },
    };

    const url =
      postId === undefined
        ? "http://localhost:3000/post"
        : `http://localhost:3000/post/${postId}`;
    const method = postId === undefined ? axios.post : axios.put;

    method(url, postData, config)
      .then((response) => {
        alert(
          postId === undefined
            ? "Post created successfully"
            : "Post updated successfully"
        );
        console.log("Post saved successfully", response.data);
        console.log("imgUrl: ", imgUrl);
        navigate("/"); // Navigate to the main page
      })
      .catch((error) => {
        console.error("Error saving post", error);
      });
  };

  return (
    <div>
      <button
        onClick={() => {
          window.history.back();
        }}
        type="button"
        className="btn btn-outline-secondary"
        style={{
          border: "2px solid #ccc",
          borderRadius: "10px",
          padding: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          margin: "10px",
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
                width: "200px",
                height: "50px",
              }} // Ensures the input is on a new line and adds vertical margin
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
            Image URL:
            <input type="file" name="imgUrlForm" defaultValue={post?.imgUrl} />
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
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default EditPost;

// import React, { useState, useEffect } from "react";
// import { useParams,useNavigate } from "react-router-dom";
// import { IPost } from "../Post";
// import axios from "axios";

// function EditPost() {
//   const [post, setPost] = useState<IPost>();
//   const { postId } = useParams<{ postId: string }>();
//   const navigate = useNavigate();
//   useEffect(() => {
//     axios.get(`http://localhost:3000/post/${postId}`).then((response) => {
//       setPost(response.data);
//     });
//   }, [postId]);

//   const onFormSubmit = (
//     event: React.MouseEvent<HTMLButtonElement, MouseEvent>
//   ) => {
//     event.preventDefault();
//     const title = (
//       document.querySelector('input[name="titleForm"]') as HTMLInputElement
//     ).value;
//     const content = (
//       document.querySelector('input[name="contentForm"]') as HTMLInputElement
//     ).value;
//     const products = (
//       document.querySelector('input[name="productsForm"]') as HTMLInputElement
//     ).value;
//     const imgUrl = (
//       document.querySelector('input[name="imgUrlForm"]') as HTMLInputElement
//     ).value;
//     if (postId === undefined) {
//       axios
//         .post(
//           "http://localhost:3000/post",
//           {
//             title,
//             content,
//             products,
//             imgUrl,
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization:
//                 "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjgxMzA2ZDRjZDcwYThmMzQyOGRkZjIiLCJpYXQiOjE3MTk3NDI1OTcsImV4cCI6MTcyNzUxODU5N30.FB4P-o6s8nlDedipZMCtCajzSG0_SPiDHmN2W4SEdkM",
//             },
//           }
//         )
//         .then((response) => {
//           console.log("Post created successfully", response.data);
//         })
//         .catch((error) => {
//           console.error("Error creating post", error);
//         });
//     } else {
//       axios
//         .put(
//           `http://localhost:3000/post/${postId}`,
//           {
//             title,
//             content,
//             products,
//             imgUrl,
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization:
//                 "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjgxMzA2ZDRjZDcwYThmMzQyOGRkZjIiLCJpYXQiOjE3MTk3NDI1OTcsImV4cCI6MTcyNzUxODU5N30.FB4P-o6s8nlDedipZMCtCajzSG0_SPiDHmN2W4SEdkM",
//             },
//           }
//         )
//         .then((response) => {
//           console.log("Post updated successfully", response.data);
//         })
//         .catch((error) => {
//           console.error("Error updating post", error);
//         });
//     }

//   };

//   return (
//     <div>
//       <button
//         onClick={() => {
//           window.history.back();
//         }}
//       >
//         Back
//       </button>
//       <form>
//         <label>
//           Title:
//           <input type="text" name="titleForm" defaultValue={post?.title} />
//         </label>
//         <label>
//           Content:
//           <input type="text" name="contentForm" defaultValue={post?.content} />
//         </label>
//         <label>
//           Products:
//           <input
//             type="text"
//             name="productsForm"
//             defaultValue={post?.products}
//           />
//         </label>
//         <label>
//           Image URL:
//           <input type="file" name="imgUrlForm" defaultValue={post?.imgUrl} />
//         </label>
//         <button type="submit" onClick={onFormSubmit}>
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

// export default EditPost;
