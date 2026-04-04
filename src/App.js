import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const uploadFile = async () => {
    if (!file) {
      setError("Please choose a file first.");
      return;
    }

    setError("");

    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post("http://127.0.0.1:8000/process", formData);
    setResult(res.data);
  };

  return (
    <div>
      <h1>AI Lecture Summarizer</h1>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadFile}>Upload</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div>
          <h2>Summary</h2>
          <p>{result.summary}</p>

          <h2>Key Points</h2>
          <ul>
            {result.keypoints.map((kp, i) => (
              <li key={i}>{kp}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
