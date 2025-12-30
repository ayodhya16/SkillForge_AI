package com.mahesh.skillForge.dto;

import java.util.Map;

public class QuizResultResponse {

    public int totalQuestions;
    public int correctAnswers;
    public int scorePercentage;

    // questionId -> correct option
    public Map<Long, String> correctAnswersMap;
}
