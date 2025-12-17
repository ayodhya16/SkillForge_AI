package com.mahesh.skillForge.controller;

import java.security.Principal;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
public class CertificateController {

    private final EnrollmentRepository enrollRepo;
    private final CourseRepository courseRepo;
    private final UserRepository userRepo;
    private final CertificateService certService;

    public CertificateController(
        EnrollmentRepository enrollRepo,
        CourseRepository courseRepo,
        UserRepository userRepo,
        CertificateService certService) {
        this.enrollRepo = enrollRepo;
        this.courseRepo = courseRepo;
        this.userRepo = userRepo;
        this.certService = certService;
    }

    @PostMapping("/courses/{id}/complete")
    public String complete(@PathVariable Long id, Principal principal) {
        User student = userRepo.findByEmail(principal.getName()).orElseThrow();
        Course course = courseRepo.findById(id).orElseThrow();

        Enrollment e = enrollRepo.findByStudentAndCourse(student, course).orElseThrow();
        e.setCompleted(true);
        enrollRepo.save(e);

        certService.generate(student, course);
        return "Certificate generated";
    }
}

