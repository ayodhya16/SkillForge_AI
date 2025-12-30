package com.mahesh.skillForge.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.mahesh.skillForge.entity.*;
import com.mahesh.skillForge.repository.*;

@RestController
@RequestMapping("/api/student")
@PreAuthorize("hasRole('STUDENT')")
public class StudentLearningController {

    private final CourseSectionRepository sectionRepo;
    private final CourseContentRepository contentRepo;
    private final EnrollmentRepository enrollmentRepo;
    private final UserRepository userRepo;

    public StudentLearningController(
            CourseSectionRepository sectionRepo,
            CourseContentRepository contentRepo,
            EnrollmentRepository enrollmentRepo,
            UserRepository userRepo) {
        this.sectionRepo = sectionRepo;
        this.contentRepo = contentRepo;
        this.enrollmentRepo = enrollmentRepo;
        this.userRepo = userRepo;
    }

    // 📘 Get sections of a course (with enrollment check)
    @GetMapping("/courses/{courseId}/sections")
    public List<CourseSection> getSections(
            @PathVariable Long courseId,
            Principal principal) {

        User student = userRepo.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Course course = new Course();
        course.setId(courseId);

        enrollmentRepo.findByStudentAndCourse(student, course)
                .orElseThrow(() -> new RuntimeException("Not enrolled"));

        return sectionRepo.findByCourseOrderByOrderIndexAsc(course);
    }

    // 📄 Get contents of a section
    @GetMapping("/sections/{sectionId}/contents")
    public List<CourseContent> getContents(@PathVariable Long sectionId) {

        CourseSection section = sectionRepo.findById(sectionId)
                .orElseThrow(() -> new RuntimeException("Section not found"));

        return contentRepo.findBySectionOrderByOrderIndexAsc(section);
    }
}
