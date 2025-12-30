package com.mahesh.skillForge.repository;

import com.mahesh.skillForge.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    boolean existsByStudentAndCourse(User student, Course course);

    Optional<Enrollment> findByStudentAndCourse(User student, Course course);

    List<Enrollment> findByStudent(User student);

    // analytics
    long countByCourseInstructorId(Long instructorId);

    long countByCompletedTrueAndCourseInstructorId(Long instructorId);
}
