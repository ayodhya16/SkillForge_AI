package com.mahesh.skillForge.repository;

import com.mahesh.skillForge.entity.Certificate;
import com.mahesh.skillForge.entity.Course;
import com.mahesh.skillForge.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CertificateRepository extends JpaRepository<Certificate, Long> {

    Optional<Certificate> findByStudentAndCourse(User student, Course course);
}
