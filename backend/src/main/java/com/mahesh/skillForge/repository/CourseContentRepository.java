package com.mahesh.skillForge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mahesh.skillForge.entity.Course;
import com.mahesh.skillForge.entity.CourseContent;
import com.mahesh.skillForge.entity.CourseSection;

public interface CourseContentRepository extends JpaRepository<CourseContent, Long> {

    List<CourseContent> findBySectionOrderByOrderIndexAsc(CourseSection section);

    List<CourseContent> findByCourseOrderByOrderIndexAsc(Course course);
}
