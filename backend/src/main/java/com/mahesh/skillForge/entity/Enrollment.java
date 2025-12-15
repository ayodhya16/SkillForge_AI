package com.mahesh.skillForge.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "enrollments")
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User student;

    @ManyToOne
    private Course course;

    private boolean completed = false;

    private LocalDateTime enrolledAt = LocalDateTime.now();

    // getters & setters
    public Long getId() { return id; }
    public User getStudent() { return student; }
    public Course getCourse() { return course; }
    public boolean isCompleted() { return completed; }
    public LocalDateTime getEnrolledAt() { return enrolledAt; }

    public void setStudent(User student) { this.student = student; }
    public void setCourse(Course course) { this.course = course; }
    public void setCompleted(boolean completed) { this.completed = completed; }
}
