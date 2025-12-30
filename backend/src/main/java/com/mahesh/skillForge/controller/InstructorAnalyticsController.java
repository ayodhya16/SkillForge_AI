package com.mahesh.skillForge.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.mahesh.skillForge.entity.User;
import com.mahesh.skillForge.repository.*;

@RestController
@RequestMapping("/api/instructor")
@PreAuthorize("hasRole('INSTRUCTOR')")
public class InstructorAnalyticsController {

    private final EnrollmentRepository enrollmentRepo;
    private final CourseRepository courseRepo;
    private final UserRepository userRepo;

    public InstructorAnalyticsController(
            EnrollmentRepository enrollmentRepo,
            CourseRepository courseRepo,
            UserRepository userRepo) {
        this.enrollmentRepo = enrollmentRepo;
        this.courseRepo = courseRepo;
        this.userRepo = userRepo;
    }

    @GetMapping("/analytics")
    public Map<String, Long> analytics(Principal principal) {

        User instructor = userRepo.findByEmail(principal.getName()).orElseThrow();

        Map<String, Long> data = new HashMap<>();
        data.put("totalCourses", courseRepo.countByInstructor(instructor));
        data.put("totalStudents", enrollmentRepo.countByCourseInstructorId(instructor.getId()));
        data.put("completedStudents",
                enrollmentRepo.countByCompletedTrueAndCourseInstructorId(instructor.getId()));

        return data;
    }
}
