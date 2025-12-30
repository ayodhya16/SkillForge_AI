package com.mahesh.skillForge.controller;

import com.mahesh.skillForge.dto.QuizResultResponse;
import com.mahesh.skillForge.dto.QuizSubmitRequest;
import com.mahesh.skillForge.service.QuizService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student/quizzes")
@PreAuthorize("hasRole('STUDENT')")
public class StudentQuizController {

    private final QuizService quizService;

    public StudentQuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @PostMapping("/submit")
    public QuizResultResponse submit(@RequestBody QuizSubmitRequest request) {
        return quizService.evaluateQuiz(request);
    }
}
