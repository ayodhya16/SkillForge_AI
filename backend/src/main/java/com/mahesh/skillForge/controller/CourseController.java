package com.mahesh.skillForge.controller;

import com.mahesh.skillForge.entity.Course;
import com.mahesh.skillForge.service.CourseService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService service;

    public CourseController(CourseService service) { this.service = service; }

    // Anyone authenticated can list courses
    @GetMapping
    public ResponseEntity<List<Course>> list() {
        return ResponseEntity.ok(service.listAll());
    }

    // Only INSTRUCTOR can create courses
    @PreAuthorize("hasRole('INSTRUCTOR')")
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Course course, Authentication authentication) {
        // Optionally set createdBy from auth principal's username (email) -> lookup id
        // Example: authentication.getName() returns email
        // Use UserRepository to fetch user id
        return ResponseEntity.ok(service.create(course));
    }

    // Only instructor who created or admin can delete (example)
    @PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
