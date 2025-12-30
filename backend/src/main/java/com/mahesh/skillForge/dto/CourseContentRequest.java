package com.mahesh.skillForge.dto;

public class CourseContentRequest {

    private String title;
    private String type;        // VIDEO, PDF, TEXT, LINK
    private String url;         // for VIDEO / PDF / LINK
    private String textContent; // for TEXT

    // ===== Getters & Setters =====

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getTextContent() {
        return textContent;
    }

    public void setTextContent(String textContent) {
        this.textContent = textContent;
    }
}
