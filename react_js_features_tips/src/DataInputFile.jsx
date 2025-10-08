import { useState, useEffect } from "react";

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  // вариант с then
  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     if (!file) return;

  //     const formData = new FormData(e.target);
  //     formData.append("filename", file);

  //     return fetch("/api/upload", {
  //       method: "POST",
  //       body: formData,
  //     })
  //       .then((res) => if (!res.ok) throw new Error ('Error')
  //        res.json())
  //       .catch((err) => console.error(err));
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("filename", file);

    try {
      const request = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!request.ok) {
        throw new Error(`Ошибка: ${request.status}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFile} />
      <button type="submit">Submit File</button>
    </form>
  );
};
