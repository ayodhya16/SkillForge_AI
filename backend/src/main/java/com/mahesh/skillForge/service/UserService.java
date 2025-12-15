package com.mahesh.skillForge.service;

import com.mahesh.skillForge.dto.UserRegisterDto;
import com.mahesh.skillForge.entity.User;
import com.mahesh.skillForge.entity.Role;
import com.mahesh.skillForge.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(UserRegisterDto dto) {

        if (userRepository.existsByEmail(dto.getEmail().toLowerCase())) {
            throw new IllegalArgumentException("Email already in use");
        }

        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail().toLowerCase());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        // 🔒 FORCE role to STUDENT (CRITICAL SECURITY FIX)
        user.setRole(Role.STUDENT);

        user.setPhoneNumber(dto.getPhoneNumber());

        // createdAt & updatedAt handled by @PrePersist / @PreUpdate
        return userRepository.save(user);
    }
}
