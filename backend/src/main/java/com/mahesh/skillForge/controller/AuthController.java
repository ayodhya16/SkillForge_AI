package com.mahesh.skillForge.controller;

import com.mahesh.skillForge.dto.LoginRequest;
import com.mahesh.skillForge.dto.LoginResponse;
import com.mahesh.skillForge.entity.User;
import com.mahesh.skillForge.repository.UserRepository;
import com.mahesh.skillForge.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import com.mahesh.skillForge.dto.UserRegisterDto;
import com.mahesh.skillForge.service.UserService;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserService userService;

    public AuthController(UserRepository userRepository, AuthenticationManager authenticationManager, JwtUtil jwtUtil, UserService userService) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegisterDto dto) {
        try {
            User saved = userService.registerUser(dto);
            saved.setPassword(null);
            return ResponseEntity.ok(saved);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(500).body("Server error");
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            // Authenticate using AuthenticationManager -> triggers CustomUserDetailsService
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail().toLowerCase(), request.getPassword()));

            User user = userRepository.findByEmail(request.getEmail().toLowerCase())
                    .orElseThrow();

            String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
            return ResponseEntity.ok(new LoginResponse(token, user.getRole().name()));
        } catch (Exception ex) {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }
}

    

