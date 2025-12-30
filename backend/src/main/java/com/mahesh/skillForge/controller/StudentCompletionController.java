package com.mahesh.skillForge.controller;

import java.security.Principal;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.mahesh.skillForge.entity.Course;
import com.mahesh.skillForge.entity.Enrollment;
import com.mahesh.skillForge.entity.User;
import com.mahesh.skillForge.repository.CourseRepository;
import com.mahesh.skillForge.repository.EnrollmentRepository;
import com.mahesh.skillForge.repository.UserRepository;
import com.mahesh.skillForge.service.CertificateService;

@RestController
@RequestMapping("/api/student")
@PreAuthorize("hasRole('STUDENT')")
public class StudentCompletionController {

    private final EnrollmentRepository enrollmentRepo;
    private final CourseRepository courseRepo;
    private final UserRepository userRepo;
    private final CertificateService certificateService;

    public StudentCompletionController(
            EnrollmentRepository enrollmentRepo,
            CourseRepository courseRepo,
            UserRepository userRepo,
            CertificateService certificateService) {
        this.enrollmentRepo = enrollmentRepo;
        this.courseRepo = courseRepo;
        this.userRepo = userRepo;
        this.certificateService = certificateService;
    }

    @PostMapping("/courses/{courseId}/complete")
    public String completeCourse(
            @PathVariable Long courseId,
            Principal principal) {

        User student = userRepo.findByEmail(principal.getName()).orElseThrow();
        Course course = courseRepo.findById(courseId).orElseThrow();

        Enrollment enrollment = enrollmentRepo
                .findByStudentAndCourse(student, course)
                .orElseThrow();

        enrollment.setCompleted(true);
        enrollmentRepo.save(enrollment);

        certificateService.generateCertificate(student, course);

        return "Course completed & certificate generated";
    }
}
