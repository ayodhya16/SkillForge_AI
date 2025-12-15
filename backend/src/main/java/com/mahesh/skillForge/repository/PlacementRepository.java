package com.mahesh.skillForge.repository;

import com.mahesh.skillForge.entity.Placement;
import com.mahesh.skillForge.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlacementRepository extends JpaRepository<Placement, Long> {

    List<Placement> findByStudent(User student);
}
