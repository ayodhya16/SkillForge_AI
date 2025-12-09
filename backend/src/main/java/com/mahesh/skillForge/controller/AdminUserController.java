package com.mahesh.skillForge.controller;

import com.mahesh.skillForge.entity.User;
import com.mahesh.skillForge.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@PreAuthorize("hasRole('ADMIN')") // all methods require ADMIN by default
public class AdminUserController {

    private final UserRepository userRepository;

    public AdminUserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<User>> list() {
        List<User> users = userRepository.findAll();
        users.forEach(u -> u.setPassword(null));
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/role")
    public ResponseEntity<?> changeRole(@PathVariable Long id, @RequestParam String role) {
        User u = userRepository.findById(id).orElseThrow();
        // validate role value
        u.setRole(Enum.valueOf(com.mahesh.skillForge.entity.Role.class, role.toUpperCase()));
        userRepository.save(u);
        u.setPassword(null);
        return ResponseEntity.ok(u);
    }
}
