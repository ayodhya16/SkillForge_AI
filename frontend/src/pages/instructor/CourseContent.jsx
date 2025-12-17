import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axiosInstance";
import Card from "../../components/Card";


export default function InstructorCourseContent({ courseId }) {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("VIDEO");
  const [url, setUrl] = useState("");

  useEffect(() => {
    axios.get(`/api/instructor/courses/${courseId}/content`)
      .then(res => setList(res.data));
  }, []);

  async function add() {
    await axios.post(`/api/instructor/courses/${courseId}/content`, {
      title, type, url
    });
    setTitle(""); setUrl("");
    const res = await axios.get(`/api/instructor/courses/${courseId}/content`);
    setList(res.data);
  }

  return (
    <div>
      <h2>Add Content</h2>

      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <select value={type} onChange={e=>setType(e.target.value)}>
        <option>VIDEO</option>
        <option>PDF</option>
        <option>LINK</option>
      </select>
      <input placeholder="URL" value={url} onChange={e=>setUrl(e.target.value)} />
      <button onClick={add}>Add</button>

      <hr />

      {list.map(c => (
        <div key={c.id}>
          {c.title} ({c.type})
        </div>
      ))}
    </div>
  );
}

