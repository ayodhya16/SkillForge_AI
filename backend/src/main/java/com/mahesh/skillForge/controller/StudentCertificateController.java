package com.mahesh.skillForge.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.mahesh.skillForge.entity.Certificate;
import com.mahesh.skillForge.entity.User;
import com.mahesh.skillForge.repository.CertificateRepository;
import com.mahesh.skillForge.repository.UserRepository;

@RestController
@RequestMapping("/api/student")
@PreAuthorize("hasRole('STUDENT')")
public class StudentCertificateController {

    private final CertificateRepository certRepo;
    private final UserRepository userRepo;

    public StudentCertificateController(
            CertificateRepository certRepo,
            UserRepository userRepo) {
        this.certRepo = certRepo;
        this.userRepo = userRepo;
    }

    @GetMapping("/certificates")
    public List<Certificate> myCertificates(Principal principal) {

        User student = userRepo.findByEmail(principal.getName()).orElseThrow();
        return certRepo.findByStudent(student);
    }
}
