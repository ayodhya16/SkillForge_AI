package com.mahesh.skillForge.repository;

import com.mahesh.skillForge.entity.Course;
import com.mahesh.skillForge.entity.CourseContent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseContentRepository extends JpaRepository<CourseContent, Long> {
    List<CourseContent> findByCourseOrderByOrderIndexAsc(Course course);
}
