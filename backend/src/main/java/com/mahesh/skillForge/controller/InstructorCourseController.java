package com.mahesh.skillForge.controller;

import com.mahesh.skillForge.entity.Course;
import com.mahesh.skillForge.entity.User;
import com.mahesh.skillForge.repository.CourseRepository;
import com.mahesh.skillForge.repository.UserRepository;

//import jakarta.transaction.Transactional;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/instructor")
@PreAuthorize("hasRole('INSTRUCTOR')")
public class InstructorCourseController {

    private final CourseRepository courseRepo;
    private final UserRepository userRepo;

    public InstructorCourseController(CourseRepository courseRepo, UserRepository userRepo) {
        this.courseRepo = courseRepo;
        this.userRepo = userRepo;
    }

    @PostMapping("/courses")
    public Course create(@RequestBody Course course, Principal principal) {
        User instructor = userRepo.findByEmail(principal.getName()).orElseThrow();
        course.setInstructor(instructor);
        course.setPublished(false);
        return courseRepo.save(course);
    }

    @GetMapping("/courses")
    public List<Course> myCourses(Principal principal) {
        User instructor = userRepo.findByEmail(principal.getName()).orElseThrow();
        return courseRepo.findByInstructor(instructor);
    }

    @PutMapping("/courses/{id}/publish")
    public Course publish(@PathVariable Long id, Principal principal) {
        Course c = courseRepo.findById(id).orElseThrow();
        if (!c.getInstructor().getEmail().equals(principal.getName()))
            throw new RuntimeException("Not allowed");
        c.setPublished(true);
        return courseRepo.save(c);
    }
}

