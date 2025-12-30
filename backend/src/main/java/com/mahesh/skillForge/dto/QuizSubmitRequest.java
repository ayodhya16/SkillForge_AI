package com.mahesh.skillForge.dto;

import java.util.Map;

public class QuizSubmitRequest {

    public Long quizId;

    // questionId -> chosenOption
    public Map<Long, String> answers;
}
