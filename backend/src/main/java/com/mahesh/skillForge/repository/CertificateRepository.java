package com.mahesh.skillForge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mahesh.skillForge.entity.Certificate;
import com.mahesh.skillForge.entity.User;
import com.mahesh.skillForge.entity.Course;

public interface CertificateRepository extends JpaRepository<Certificate, Long> {

    boolean existsByStudentAndCourse(User student, Course course);

    List<Certificate> findByStudent(User student);
}
