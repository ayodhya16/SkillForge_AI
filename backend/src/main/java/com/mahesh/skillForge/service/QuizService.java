package com.mahesh.skillForge.service;

import com.mahesh.skillForge.dto.*;
import com.mahesh.skillForge.entity.*;
import com.mahesh.skillForge.repository.*;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class QuizService {

    private final QuizRepository quizRepo;
    private final QuizQuestionRepository questionRepo;
    private final CourseSectionRepository sectionRepo;

    public QuizService(
            QuizRepository quizRepo,
            QuizQuestionRepository questionRepo,
            CourseSectionRepository sectionRepo) {
        this.quizRepo = quizRepo;
        this.questionRepo = questionRepo;
        this.sectionRepo = sectionRepo;
    }

    /* ============================
       CREATE QUIZ (Instructor)
       ============================ */
    public Quiz createQuiz(QuizCreateRequest req) {

        CourseSection section = sectionRepo.findById(req.sectionId)
                .orElseThrow(() -> new RuntimeException("Section not found"));

        Quiz quiz = new Quiz();
        quiz.setTitle(req.title);
        quiz.setSection(section);
        quiz = quizRepo.save(quiz);

        for (QuizQuestionRequest q : req.questions) {
            QuizQuestion question = new QuizQuestion();
            question.setQuiz(quiz);
            question.setQuestion(q.question);
            question.setOptionA(q.optionA);
            question.setOptionB(q.optionB);
            question.setOptionC(q.optionC);
            question.setOptionD(q.optionD);
            question.setCorrectOption(q.correctOption);
            questionRepo.save(question);
        }

        return quiz;
    }

    /* ============================
       SUBMIT QUIZ (Student)
       ============================ */
    public QuizResultResponse evaluateQuiz(QuizSubmitRequest req) {

        Quiz quiz = quizRepo.findById(req.quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        var questions = questionRepo.findByQuiz(quiz);

        int correct = 0;
        Map<Long, String> correctAnswersMap = new HashMap<>();

        for (QuizQuestion q : questions) {
            String correctOption = q.getCorrectOption();
            String chosen = req.answers.get(q.getId());

            correctAnswersMap.put(q.getId(), correctOption);

            if (correctOption.equalsIgnoreCase(chosen)) {
                correct++;
            }
        }

        QuizResultResponse res = new QuizResultResponse();
        res.totalQuestions = questions.size();
        res.correctAnswers = correct;
        res.scorePercentage =
                (int) ((correct * 100.0) / questions.size());
        res.correctAnswersMap = correctAnswersMap;

        return res;
    }
}
