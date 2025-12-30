package com.mahesh.skillForge.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.mahesh.skillForge.entity.CourseContent;
import com.mahesh.skillForge.entity.CourseSection;
import com.mahesh.skillForge.repository.CourseContentRepository;
import com.mahesh.skillForge.repository.CourseSectionRepository;

@RestController
@RequestMapping("/api/instructor")
@PreAuthorize("hasRole('INSTRUCTOR')")
public class InstructorContentController {

    private final CourseContentRepository contentRepo;
    private final CourseSectionRepository sectionRepo;

    public InstructorContentController(
            CourseContentRepository contentRepo,
            CourseSectionRepository sectionRepo) {
        this.contentRepo = contentRepo;
        this.sectionRepo = sectionRepo;
    }

    // ➕ Add content to section
    @PostMapping("/sections/{sectionId}/contents")
    public CourseContent addContent(
            @PathVariable Long sectionId,
            @RequestBody CourseContent content) {

        CourseSection section = sectionRepo.findById(sectionId)
                .orElseThrow(() -> new RuntimeException("Section not found"));

        content.setSection(section);
        return contentRepo.save(content);
    }
}
