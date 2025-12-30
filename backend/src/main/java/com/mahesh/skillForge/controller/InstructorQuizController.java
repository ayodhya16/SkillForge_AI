package com.mahesh.skillForge.controller;

import com.mahesh.skillForge.dto.QuizCreateRequest;
import com.mahesh.skillForge.entity.Quiz;
import com.mahesh.skillForge.service.QuizService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/instructor/quizzes")
@PreAuthorize("hasRole('INSTRUCTOR')")
public class InstructorQuizController {

    private final QuizService quizService;

    public InstructorQuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @PostMapping
    public Quiz createQuiz(@RequestBody QuizCreateRequest request) {
        return quizService.createQuiz(request);
    }
}
