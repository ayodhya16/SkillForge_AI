package com.mahesh.skillForge.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.mahesh.skillForge.entity.Course;
import com.mahesh.skillForge.entity.User;
import com.mahesh.skillForge.repository.CourseRepository;
import com.mahesh.skillForge.repository.UserRepository;
import com.mahesh.skillForge.service.CertificateService;

@RestController
@RequestMapping("/api/certificates")
@PreAuthorize("hasRole('ADMIN')")
public class CertificateController {

    private final CertificateService certService;
    private final UserRepository userRepo;
    private final CourseRepository courseRepo;

    public CertificateController(
            CertificateService certService,
            UserRepository userRepo,
            CourseRepository courseRepo) {
        this.certService = certService;
        this.userRepo = userRepo;
        this.courseRepo = courseRepo;
    }

    @PostMapping("/generate")
    public String generateCertificate(
            @RequestParam Long userId,
            @RequestParam Long courseId) {

        User user = userRepo.findById(userId).orElseThrow();
        Course course = courseRepo.findById(courseId).orElseThrow();

        certService.generateCertificate(user, course);
        return "Certificate generated";
    }
}
