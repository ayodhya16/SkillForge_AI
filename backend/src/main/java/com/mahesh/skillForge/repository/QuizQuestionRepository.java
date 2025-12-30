package com.mahesh.skillForge.repository;

import com.mahesh.skillForge.entity.Quiz;
import com.mahesh.skillForge.entity.QuizQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizQuestionRepository extends JpaRepository<QuizQuestion, Long> {

    // Get all questions for a quiz
    List<QuizQuestion> findByQuiz(Quiz quiz);
}
