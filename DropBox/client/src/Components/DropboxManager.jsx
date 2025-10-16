import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/dropbox";

export default function DropboxManager() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    const res = await axios.get(`${API_URL}/list`);
    setFiles(res.data);
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    if (!file) return alert("Choose a file first!");
    const formData = new FormData();
    formData.append("file", file);
    await axios.post(`${API_URL}/upload`, formData);
    alert("File uploaded successfully!");
    fetchFiles();
  };

  const downloadFile = async (filename) => {
    const res = await axios.get(`${API_URL}/download/${filename}`, {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div>
      <form onSubmit={uploadFile}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>

      <h3>Stored Files:</h3>
      <ul>
        {files.map((filename) => (
          <li key={filename}>
            {filename}{" "}
            <button onClick={() => downloadFile(filename)}>Download</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
