package com.mahesh.skillForge.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.mahesh.skillForge.entity.Course;
import com.mahesh.skillForge.entity.CourseSection;
import com.mahesh.skillForge.repository.CourseRepository;
import com.mahesh.skillForge.repository.CourseSectionRepository;

@RestController
@RequestMapping("/api/instructor/sections")
@PreAuthorize("hasRole('INSTRUCTOR')")
public class InstructorSectionController {

    private final CourseSectionRepository sectionRepo;
    private final CourseRepository courseRepo;

    public InstructorSectionController(
            CourseSectionRepository sectionRepo,
            CourseRepository courseRepo) {
        this.sectionRepo = sectionRepo;
        this.courseRepo = courseRepo;
    }

    // ➕ Add section to a course
    @PostMapping("/course/{courseId}")
    public CourseSection addSection(
            @PathVariable Long courseId,
            @RequestBody CourseSection section) {

        Course course = courseRepo.findById(courseId).orElseThrow();
        section.setCourse(course);
        return sectionRepo.save(section);
    }
}
