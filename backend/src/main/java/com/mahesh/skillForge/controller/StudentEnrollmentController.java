package com.mahesh.skillForge.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.mahesh.skillForge.entity.*;
import com.mahesh.skillForge.repository.*;

@RestController
@RequestMapping("/api/student")
@PreAuthorize("hasRole('STUDENT')")
public class StudentEnrollmentController {

    private final EnrollmentRepository enrollmentRepo;
    private final CourseRepository courseRepo;
    private final UserRepository userRepo;

    public StudentEnrollmentController(
            EnrollmentRepository enrollmentRepo,
            CourseRepository courseRepo,
            UserRepository userRepo) {
        this.enrollmentRepo = enrollmentRepo;
        this.courseRepo = courseRepo;
        this.userRepo = userRepo;
    }

    // ✅ Enroll
    @PostMapping("/courses/{courseId}/enroll")
    public String enroll(@PathVariable Long courseId, Principal principal) {

        User student = userRepo.findByEmail(principal.getName()).orElseThrow();
        Course course = courseRepo.findById(courseId).orElseThrow();

        if (enrollmentRepo.existsByStudentAndCourse(student, course)) {
            return "Already enrolled";
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setStudent(student);
        enrollment.setCourse(course);
        enrollmentRepo.save(enrollment);

        return "Enrolled successfully";
    }

    // ✅ Unenroll
    @DeleteMapping("/courses/{courseId}/unenroll")
    public String unenroll(@PathVariable Long courseId, Principal principal) {

        User student = userRepo.findByEmail(principal.getName()).orElseThrow();
        Course course = courseRepo.findById(courseId).orElseThrow();

        Enrollment enrollment = enrollmentRepo
                .findByStudentAndCourse(student, course)
                .orElseThrow();

        enrollmentRepo.delete(enrollment);
        return "Unenrolled";
    }

    // ✅ My Courses
    @GetMapping("/my-courses")
    public List<Enrollment> myCourses(Principal principal) {
        User student = userRepo.findByEmail(principal.getName()).orElseThrow();
        return enrollmentRepo.findByStudent(student);
    }
}
