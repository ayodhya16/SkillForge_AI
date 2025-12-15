package com.mahesh.skillForge.service;

import com.mahesh.skillForge.entity.Course;
import com.mahesh.skillForge.entity.User;
import com.mahesh.skillForge.repository.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    private final CourseRepository repo;

    public CourseService(CourseRepository repo) {
        this.repo = repo;
    }

    public Course create(Course course) {
        return repo.save(course);
    }

    public List<Course> listAll() {
        return repo.findAll();
    }

    public Optional<Course> find(Long id) {
        return repo.findById(id);
    }

    public List<Course> findByInstructor(User instructor) {
        return repo.findByInstructor(instructor);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
