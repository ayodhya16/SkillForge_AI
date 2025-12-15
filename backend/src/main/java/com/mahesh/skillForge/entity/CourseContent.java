package com.mahesh.skillForge.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "course_content")
public class CourseContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Enumerated(EnumType.STRING)
    private ContentType type; // VIDEO, LINK, PDF

    @Column(length = 1000)
    private String url;

    private int orderIndex;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    // getters & setters
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public ContentType getType() { return type; }
    public String getUrl() { return url; }
    public int getOrderIndex() { return orderIndex; }
    public Course getCourse() { return course; }

    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setType(ContentType type) { this.type = type; }
    public void setUrl(String url) { this.url = url; }
    public void setOrderIndex(int orderIndex) { this.orderIndex = orderIndex; }
    public void setCourse(Course course) { this.course = course; }
}
