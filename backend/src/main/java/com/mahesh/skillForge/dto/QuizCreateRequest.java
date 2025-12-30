package com.mahesh.skillForge.dto;

import java.util.List;

public class QuizCreateRequest {

    public String title;
    public Long sectionId;
    public List<QuizQuestionRequest> questions;
}
