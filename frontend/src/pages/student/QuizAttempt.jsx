import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Toast from "../../components/Toast";

export default function QuizAttempt({ sectionId }) {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [toast, setToast] = useState({});

  useEffect(() => {
    axios
      .get(`/api/student/quizzes/section/${sectionId}`)
      .then(res => setQuiz(res.data))
      .catch(() =>
        setToast({ type: "error", message: "Quiz not available" })
      );
  }, [sectionId]);

  const select = (qid, option) => {
    setAnswers(a => ({ ...a, [qid]: option }));
  };

  const submit = async () => {
    try {
      const res = await axios.post(
        `/api/student/quizzes/${quiz.id}/submit`,
        { answers }
      );
      setResult(res.data);
    } catch (e) {
      setToast({
        type: "error",
        message: e.response?.data || "Submission failed"
      });
    }
  };

  if (!quiz) return null;

  if (result) {
    return <QuizResult quiz={quiz} result={result} />;
  }

  return (
    <Card className="space-y-4">
      <h2 className="text-xl font-semibold">{quiz.title}</h2>

      {quiz.questions.map((q, i) => (
        <Card key={q.id} className="space-y-2">
          <p className="font-medium">
            {i + 1}. {q.question}
          </p>

          {["A", "B", "C", "D"].map(opt => (
            <label key={opt} className="block text-sm cursor-pointer">
              <input
                type="radio"
                name={`q-${q.id}`}
                checked={answers[q.id] === opt}
                onChange={() => select(q.id, opt)}
              />
              <span className="ml-2">
                {q[`option${opt}`]}
              </span>
            </label>
          ))}
        </Card>
      ))}

      <Button onClick={submit}>Submit Quiz</Button>

      {toast.message && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast({})}
        />
      )}
    </Card>
  );
}
