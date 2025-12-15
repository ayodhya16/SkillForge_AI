package com.mahesh.skillForge.controller;

import com.mahesh.skillForge.entity.*;
import com.mahesh.skillForge.repository.CourseContentRepository;
import com.mahesh.skillForge.repository.CourseRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/instructor")
@PreAuthorize("hasRole('INSTRUCTOR')")
public class InstructorCourseContentController {

    private final CourseRepository courseRepo;
    private final CourseContentRepository contentRepo;

    public InstructorCourseContentController(
            CourseRepository courseRepo,
            CourseContentRepository contentRepo) {
        this.courseRepo = courseRepo;
        this.contentRepo = contentRepo;
    }

    // 🔹 Add content
    @PostMapping("/courses/{courseId}/content")
    public CourseContent addContent(
            @PathVariable Long courseId,
            @RequestBody CourseContent content) {

        Course course = courseRepo.findById(courseId).orElseThrow();
        content.setCourse(course);
        return contentRepo.save(content);
    }

    // 🔹 View content (Instructor)
    @GetMapping("/courses/{courseId}/content")
    public List<CourseContent> getContent(@PathVariable Long courseId) {
        Course course = courseRepo.findById(courseId).orElseThrow();
        return contentRepo.findByCourseOrderByOrderIndexAsc(course);
    }
}
