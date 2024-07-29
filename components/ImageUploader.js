import { useState } from "react";
import { uploadImage } from "../lib/upload";

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    const imageUrl = await uploadImage(file);

    if (!imageUrl) {
      alert("Failed to upload image");
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/save-image-url`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, imageUrl }),
      }
    );

    if (!response.ok) {
      alert("Failed to save image URL to database");
      return;
    }

    alert("Image uploaded and URL saved to database");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
      />
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
};

export default ImageUploader;
