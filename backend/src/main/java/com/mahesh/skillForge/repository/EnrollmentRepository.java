package com.mahesh.skillForge.repository;

import com.mahesh.skillForge.entity.Course;
import com.mahesh.skillForge.entity.Enrollment;
import com.mahesh.skillForge.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    boolean existsByStudentAndCourse(User student, Course course);

    Optional<Enrollment> findByStudentAndCourse(User student, Course course);

    List<Enrollment> findByStudent(User student);
    @Query("""
   SELECT COUNT(e)
   FROM Enrollment e
   WHERE e.course.instructor.id = :instructorId
""")
long totalStudents(@Param("instructorId") Long instructorId);

@Query("""
   SELECT COUNT(e)
   FROM Enrollment e
   WHERE e.course.instructor.id = :instructorId
     AND e.completed = true
""")
long completedStudents(@Param("instructorId") Long instructorId);

}

