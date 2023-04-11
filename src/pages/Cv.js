import React, { useState } from "react";
import { storage } from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
export default function Cv() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const storageRef = ref(
      storage,
      selectedFile.name.endsWith(".pdf")
        ? "pdfs/" + selectedFile.name
        : "images/" + selectedFile.name
    );
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        alert(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  return (
    <div className="container mx-auto my-4 py-10">
      <form
        className="flex items-center justify-center flex-col"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-center">
          <label className="w-80 flex flex-col items-center px-4 py-6 border-black  bg-black text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer text-white hover:bg-gray-400 hover:text-black">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M17 7V3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4H1a1 1 0 0 0 0 2h2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8h2a1 1 0 0 0 0-2h-2zM5 3h10v4h-2a1 1 0 0 0 0 2h2v6H5V5h2a1 1 0 0 0 0-2H5v-.001z" />
            </svg>
            <span className="mt-2 text-base leading-normal">Select a file</span>
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
        </div>
        <button
          className="bg-blue-400 w-80 hover:bg-blue-600 hover:text-white  text-black font-bold py-2 px-4 rounded mt-4"
          type="submit"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
