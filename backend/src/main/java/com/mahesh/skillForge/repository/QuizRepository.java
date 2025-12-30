package com.mahesh.skillForge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mahesh.skillForge.entity.Quiz;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
}

