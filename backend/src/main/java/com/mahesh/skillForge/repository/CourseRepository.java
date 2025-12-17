package com.mahesh.skillForge.repository;

import com.mahesh.skillForge.entity.Course;
import com.mahesh.skillForge.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByInstructor(User instructor);
    List<Course> findByPublishedTrue();
    long countByInstructor(User instructor);
    
}
