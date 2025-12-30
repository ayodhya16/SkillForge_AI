package com.mahesh.skillForge.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.mahesh.skillForge.entity.Course;
import com.mahesh.skillForge.entity.Exam;
import com.mahesh.skillForge.repository.CourseRepository;
import com.mahesh.skillForge.repository.ExamRepository;

@RestController
@RequestMapping("/api/instructor/exams")
@PreAuthorize("hasRole('INSTRUCTOR')")
public class InstructorExamController {

    private final ExamRepository examRepo;
    private final CourseRepository courseRepo;

    public InstructorExamController(
            ExamRepository examRepo,
            CourseRepository courseRepo) {
        this.examRepo = examRepo;
        this.courseRepo = courseRepo;
    }

    // ✅ One exam per course
    @PostMapping("/course/{courseId}")
    public Exam createExam(
            @PathVariable Long courseId,
            @RequestBody Exam exam) {

        Course course = courseRepo.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        if (examRepo.findByCourse(course).isPresent()) {
            throw new RuntimeException("Exam already exists");
        }

        exam.setCourse(course);
        return examRepo.save(exam);
    }
}
