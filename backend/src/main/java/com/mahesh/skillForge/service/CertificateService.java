package com.mahesh.skillForge.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.mahesh.skillForge.entity.Certificate;
import com.mahesh.skillForge.entity.Course;
import com.mahesh.skillForge.entity.User;
import com.mahesh.skillForge.repository.CertificateRepository;

@Service
public class CertificateService {

    private final CertificateRepository certificateRepo;

    public CertificateService(CertificateRepository certificateRepo) {
        this.certificateRepo = certificateRepo;
    }

    public void generateCertificate(User student, Course course) {

        if (certificateRepo.existsByStudentAndCourse(student, course)) {
            return;
        }

        Certificate certificate = new Certificate();
        certificate.setStudent(student);
        certificate.setCourse(course);
        certificate.setIssuedAt(LocalDateTime.now());
        certificate.setCertificateUrl(
            "/certificates/" + student.getId() + "_" + course.getId() + ".pdf"
        );

        certificateRepo.save(certificate);
    }

}
