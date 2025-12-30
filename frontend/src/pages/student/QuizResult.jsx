import React from "react";
import Card from "../../components/Card";

export default function QuizResult({ quiz, result }) {
  return (
    <Card className="space-y-4">
      <h2 className="text-xl font-semibold text-indigo-300">
        Quiz Result
      </h2>

      <p className="text-lg">
        Score: {result.score} / {result.total}
      </p>

      <p
        className={`font-medium ${
          result.passed ? "text-green-400" : "text-red-400"
        }`}
      >
        {result.passed ? "Passed 🎉" : "Failed ❌"}
      </p>

      <hr />

      {quiz.questions.map((q, i) => (
        <Card key={q.id}>
          <p className="font-medium">
            {i + 1}. {q.question}
          </p>

          <p className="text-sm text-slate-400">
            Correct Answer:{" "}
            {q[`option${result.correctAnswers[q.id]}`]}
          </p>
        </Card>
      ))}
    </Card>
  );
}
