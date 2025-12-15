package com.mahesh.skillForge.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mahesh.skillForge.entity.Course;
import com.mahesh.skillForge.entity.User;
import com.mahesh.skillForge.repository.CourseRepository;
import com.mahesh.skillForge.repository.UserRepository;

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

    // 🔹 Create course
    @PostMapping("/courses")
    public Course createCourse(@RequestBody Course course, Principal principal) {
        User instructor = userRepo.findByEmail(principal.getName()).orElseThrow();
        course.setInstructor(instructor);
        course.setPublished(false); // default
        return courseRepo.save(course);
    }

    // 🔹 Get instructor courses
    @GetMapping("/courses")
    public List<Course> myCourses(Principal principal) {
        User instructor = userRepo.findByEmail(principal.getName()).orElseThrow();
        return courseRepo.findByInstructor(instructor);
    }

    // ✅ PUBLISH COURSE (ADD THIS)
    @PutMapping("/courses/{id}/publish")
public Course publishCourse(@PathVariable Long id, Principal principal) {

    Course course = courseRepo.findById(id).orElseThrow();

    if (!course.getInstructor().getEmail().equals(principal.getName())) {
        throw new RuntimeException("Not allowed");
    }

    course.setPublished(true);
    return courseRepo.save(course);
}

}

