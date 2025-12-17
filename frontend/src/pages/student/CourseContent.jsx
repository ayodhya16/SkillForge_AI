import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";

export default function StudentCourseContent({ courseId }) {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    axios.get(`/api/student/courses/${courseId}/content`)
      .then(res => setContents(res.data));
  }, []);

  return (
    <div>
      {contents.map(c => (
        <div key={c.id}>
          <h4>{c.title}</h4>

          {c.type === "VIDEO" && (
            <video controls width="600">
              <source src={c.url} />
            </video>
          )}

          {c.type === "PDF" && (
            <iframe src={c.url} width="600" height="500" />
          )}

          {c.type === "LINK" && (
            <a href={c.url} target="_blank">Open Link</a>
          )}
        </div>
      ))}
    </div>
  );
}
