package com.mahesh.skillForge.controller;

import com.mahesh.skillForge.entity.User;
import com.mahesh.skillForge.entity.Role;
import com.mahesh.skillForge.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminUserController {

    private final UserRepository userRepository;

    public AdminUserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ✅ ALL USERS (Manage Users page)
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        users.forEach(u -> u.setPassword(null));
        return ResponseEntity.ok(users);
    }

    // ✅ ONLY STUDENTS (Students page)
    /*@GetMapping("/students")
    public ResponseEntity<List<User>> getStudents() {
        List<User> students = userRepository.findByRole(Role.STUDENT);
        students.forEach(s -> s.setPassword(null));
        return ResponseEntity.ok(students);
    }*/

    // ✅ DELETE USER
    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // ✅ CHANGE ROLE
    @PutMapping("/users/{id}/role")
    public ResponseEntity<User> changeRole(
            @PathVariable Long id,
            @RequestParam String role
    ) {
        User user = userRepository.findById(id).orElseThrow();
        user.setRole(Role.valueOf(role.toUpperCase()));
        userRepository.save(user);
        user.setPassword(null);
        return ResponseEntity.ok(user);
    }
}
