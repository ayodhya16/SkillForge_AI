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
    @JoinColumn(name = "student_id")
    private User student;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @Column(name = "progress_percentage")
    private int progressPercentage = 0;

    private boolean completed = false;

    @Column(name = "enrolled_at")
    private LocalDateTime enrolledAt = LocalDateTime.now();

    // getters & setters
    public Long getId() { return id; }
    public User getStudent() { return student; }
    public Course getCourse() { return course; }
    public int getProgressPercentage() { return progressPercentage; }
    public boolean isCompleted() { return completed; }

    public void setStudent(User student) { this.student = student; }
    public void setCourse(Course course) { this.course = course; }
    public void setProgressPercentage(int progressPercentage) {
        this.progressPercentage = progressPercentage;
    }
    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
