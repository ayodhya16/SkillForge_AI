package com.mahesh.skillForge.repository;

import com.mahesh.skillForge.entity.Exam;
import com.mahesh.skillForge.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ExamRepository extends JpaRepository<Exam, Long> {

    Optional<Exam> findByCourse(Course course);
}
