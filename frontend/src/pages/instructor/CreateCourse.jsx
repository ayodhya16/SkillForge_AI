export default function CreateCourse() {
  const [form, setForm] = useState({ title:"", description:"", level:"BEGINNER" });
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    await axios.post("/api/instructor/courses", form);
    navigate("/instructor/courses");
  }

  return (
    <Card>
      <h2 className="text-xl mb-4">Create Course</h2>
      <form onSubmit={submit} className="space-y-3">
        <input placeholder="Title" onChange={e=>setForm({...form,title:e.target.value})}/>
        <textarea placeholder="Description" onChange={e=>setForm({...form,description:e.target.value})}/>
        <select onChange={e=>setForm({...form,level:e.target.value})}>
          <option>BEGINNER</option>
          <option>INTERMEDIATE</option>
          <option>ADVANCED</option>
        </select>
        <button>Create</button>
      </form>
    </Card>
  );
}
