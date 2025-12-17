export default function StudentCourseDetails({ course }) {

  function downloadCertificate() {
    window.open(
      `/certificates/CERT_${course.studentId}_${course.id}.pdf`,
      "_blank"
    );
  }

  return (
    <div>
      <h2>{course.title}</h2>

      {course.completed && (
        <button
          onClick={downloadCertificate}
          className="bg-indigo-600 px-3 py-1 rounded"
        >
          Download Certificate
        </button>
      )}
    </div>
  );
}
