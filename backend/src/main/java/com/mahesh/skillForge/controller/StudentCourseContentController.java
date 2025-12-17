package com.mahesh.skillForge.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mahesh.skillForge.entity.Course;
import com.mahesh.skillForge.entity.CourseContent;
import com.mahesh.skillForge.repository.CourseContentRepository;
import com.mahesh.skillForge.repository.CourseRepository;

@RestController
@RequestMapping("/api/student")
@PreAuthorize("hasRole('STUDENT')")
public class StudentCourseContentController {

    private final CourseContentRepository contentRepo;
    private final CourseRepository courseRepo;

    public StudentCourseContentController(
        CourseContentRepository contentRepo,
        CourseRepository courseRepo) {
        this.contentRepo = contentRepo;
        this.courseRepo = courseRepo;
    }

    @GetMapping("/courses/{id}/content")
    public List<CourseContent> content(@PathVariable Long id) {
        Course c = courseRepo.findById(id).orElseThrow();
        return contentRepo.findByCourseOrderByOrderIndexAsc(c);
    }
}


