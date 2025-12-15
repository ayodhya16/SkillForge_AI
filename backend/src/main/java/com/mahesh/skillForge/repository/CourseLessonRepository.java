package com.mahesh.skillForge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mahesh.skillForge.entity.CourseLesson;

public interface CourseLessonRepository extends JpaRepository<CourseLesson, Long> {
    List<CourseLesson> findByCourseIdOrderByLessonOrder(Long courseId);
}

