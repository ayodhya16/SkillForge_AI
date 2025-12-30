package com.mahesh.skillForge.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "quizzes")
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @ManyToOne
    private CourseSection section;

    // getters & setters

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public CourseSection getSection() { return section; }
    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setSection(CourseSection section) { this.section = section; }

}