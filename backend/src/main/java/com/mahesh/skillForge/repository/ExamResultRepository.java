package com.mahesh.skillForge.repository;

import com.mahesh.skillForge.entity.ExamResult;
import com.mahesh.skillForge.entity.User;
import com.mahesh.skillForge.entity.Exam;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ExamResultRepository extends JpaRepository<ExamResult, Long> {

    Optional<ExamResult> findByStudentAndExam(User student, Exam exam);
}
