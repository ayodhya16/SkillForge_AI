package com.mahesh.skillForge.controller;

import java.security.Principal;
import java.util.List;
import java.util.stream.*;


import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.mahesh.skillForge.entity.*;
import com.mahesh.skillForge.repository.*;

@RestController
@RequestMapping("/api/student")
@PreAuthorize("hasRole('STUDENT')")
public class StudentCourseContentController {

    private final CourseRepository courseRepo;
    private final CourseSectionRepository sectionRepo;
    private final CourseContentRepository contentRepo;
    private final EnrollmentRepository enrollRepo;
    private final UserRepository userRepo;

    public StudentCourseContentController(
            CourseRepository courseRepo,
            CourseSectionRepository sectionRepo,
            CourseContentRepository contentRepo,
            EnrollmentRepository enrollRepo,
            UserRepository userRepo) {

        this.courseRepo = courseRepo;
        this.sectionRepo = sectionRepo;
        this.contentRepo = contentRepo;
        this.enrollRepo = enrollRepo;
        this.userRepo = userRepo;
    }

    @GetMapping("/courses/{courseId}/content")
    public List<CourseContent> getCourseContent(
            @PathVariable Long courseId,
            Principal principal) {

        User student = userRepo.findByEmail(principal.getName()).orElseThrow();
        Course course = courseRepo.findById(courseId).orElseThrow();

        enrollRepo.findByStudentAndCourse(student, course)
                .orElseThrow(() -> new RuntimeException("Not enrolled"));

        List<CourseSection> sections =
                sectionRepo.findByCourseOrderByOrderIndexAsc(course);

        return sections.stream()
        .flatMap(section ->
            contentRepo
                .findBySectionOrderByOrderIndexAsc(section)
                .stream()
        )
        .toList();

    }
}
