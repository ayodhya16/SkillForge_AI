import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Toast from "../../components/Toast";

export default function SectionQuizBuilder({ sectionId }) {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [toast, setToast] = useState({});

  const addQuestion = () => {
    setQuestions(qs => [
      ...qs,
      {
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctOption: "A"
      }
    ]);
  };

  const updateQuestion = (i, field, value) => {
    const copy = [...questions];
    copy[i][field] = value;
    setQuestions(copy);
  };

  const saveQuiz = async () => {
    if (!title || questions.length === 0) {
      setToast({ type: "error", message: "Quiz title and questions required" });
      return;
    }

    try {
      await axios.post("/api/instructor/quizzes", {
        title,
        sectionId,
        questions
      });

      setToast({ type: "success", message: "Quiz created successfully" });
      setTitle("");
      setQuestions([]);
    } catch (e) {
      setToast({
        type: "error",
        message: e.response?.data || "Failed to create quiz"
      });
    }
  };

  return (
    <Card className="space-y-4">
      <h2 className="text-lg font-semibold text-indigo-300">
        Create Quiz
      </h2>

      <input
        className="form-input"
        placeholder="Quiz title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      {questions.map((q, i) => (
        <Card key={i} className="space-y-2">
          <h4 className="font-medium">Question {i + 1}</h4>

          <input
            className="form-input"
            placeholder="Question text"
            value={q.question}
            onChange={e => updateQuestion(i, "question", e.target.value)}
          />

          {["A", "B", "C", "D"].map(opt => (
            <input
              key={opt}
              className="form-input"
              placeholder={`Option ${opt}`}
              value={q[`option${opt}`]}
              onChange={e =>
                updateQuestion(i, `option${opt}`, e.target.value)
              }
            />
          ))}

          <select
            className="form-input"
            value={q.correctOption}
            onChange={e =>
              updateQuestion(i, "correctOption", e.target.value)
            }
          >
            <option value="A">Correct: A</option>
            <option value="B">Correct: B</option>
            <option value="C">Correct: C</option>
            <option value="D">Correct: D</option>
          </select>
        </Card>
      ))}

      <div className="flex gap-3">
        <Button onClick={addQuestion}>+ Add Question</Button>
        <Button onClick={saveQuiz}>Save Quiz</Button>
      </div>

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
