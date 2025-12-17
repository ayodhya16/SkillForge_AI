package com.mahesh.skillForge.controller;

import com.mahesh.skillForge.entity.Course;
import com.mahesh.skillForge.repository.CourseRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
@PreAuthorize("hasRole('STUDENT')")
public class StudentCourseController {

    private final CourseRepository courseRepo;

    public StudentCourseController(CourseRepository courseRepo) {
        this.courseRepo = courseRepo;
    }

    @GetMapping("/courses")
    public List<Course> availableCourses() {
        return courseRepo.findByPublishedTrue();
    }
}

