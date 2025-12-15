package com.mahesh.skillForge.controller;

import com.mahesh.skillForge.entity.Course;
import com.mahesh.skillForge.repository.CourseRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
public class StudentCourseController {

    private final CourseRepository courseRepository;

    public StudentCourseController(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @GetMapping("/courses")
    public List<Course> getAllPublishedCourses() {
        return courseRepository.findByPublishedTrue();
    }
}
