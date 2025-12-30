package com.mahesh.skillForge.service;

import java.util.List;
import com.mahesh.skillForge.dto.CourseContentRequest;
import com.mahesh.skillForge.entity.CourseContent;

public interface CourseContentService {

    void add(Long sectionId, CourseContentRequest req);

    List<CourseContent> getBySection(Long sectionId);

    List<CourseContent> getByCourse(Long courseId); // REQUIRED
}
