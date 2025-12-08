package com.mahesh.skillForge.service;

import com.mahesh.skillForge.dto.UserRegisterDto;
import com.mahesh.skillForge.entity.User;
import com.mahesh.skillForge.entity.Role;
import com.mahesh.skillForge.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(UserRegisterDto dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }

        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail().toLowerCase());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        Role role;
        try {
            role = Role.valueOf(dto.getRole().toUpperCase());
        } catch (Exception e) {
            role = Role.STUDENT;
        }
        user.setRole(role);

        user.setPhoneNumber(dto.getPhoneNumber());
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        return userRepository.save(user);
    }
}
