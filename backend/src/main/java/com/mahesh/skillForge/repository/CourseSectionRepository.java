package com.mahesh.skillForge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mahesh.skillForge.entity.Course;
import com.mahesh.skillForge.entity.CourseSection;

public interface CourseSectionRepository extends JpaRepository<CourseSection, Long> {

    List<CourseSection> findByCourseOrderByOrderIndexAsc(Course course);
}
