package com.mahesh.skillForge.controller;

import com.mahesh.skillForge.entity.Course;
import com.mahesh.skillForge.entity.CourseContent;
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

    public InstructorCourseContentController(CourseRepository courseRepo, CourseContentRepository contentRepo) {
        this.courseRepo = courseRepo;
        this.contentRepo = contentRepo;
    }

    @PostMapping("/courses/{id}/content")
public CourseContent addContent(
        @PathVariable Long id,
        @RequestBody CourseContent content) {

    Course course = courseRepo.findById(id).orElseThrow();
    content.setCourse(course);
    return contentRepo.save(content);
}

    @GetMapping("/courses/{id}/content")
public List<CourseContent> getContent(@PathVariable Long id) {
    Course course = courseRepo.findById(id).orElseThrow();
    return contentRepo.findByCourseOrderByOrderIndexAsc(course);
}

}
