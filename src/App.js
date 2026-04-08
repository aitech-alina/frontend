import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://127.0.0.1:8000/process",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>AI Lecture Summarizer</h1>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <br /><br />

      <button onClick={uploadFile}>
        {loading ? "Processing..." : "Upload"}
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
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