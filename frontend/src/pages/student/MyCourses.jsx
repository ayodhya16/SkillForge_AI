import axios from "../../api/axiosInstance";
import Card from "../../components/Card";

export default function MyCourses() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    axios.get("/api/student/my-courses")
      .then(res => setEnrollments(res.data));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">My Courses</h1>

      {enrollments.map(e => (
        <Card key={e.id}>
          <h2>{e.course.title}</h2>
          <p>Progress: {e.progressPercentage}%</p>

          {e.completed && (
            <a href={`/api/student/certificates/${e.course.id}`}>
              Download Certificate
            </a>
          )}
        </Card>
      ))}
    </div>
  );
}
