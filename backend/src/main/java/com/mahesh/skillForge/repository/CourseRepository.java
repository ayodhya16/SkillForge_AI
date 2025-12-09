package com.mahesh.skillForge.repository;

import com.mahesh.skillForge.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByCreatedByUserId(Long userId);
}
