package com.mahesh.skillForge.controller;

import com.mahesh.skillForge.dto.UserRegisterDto;
import com.mahesh.skillForge.entity.User;
import com.mahesh.skillForge.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService){
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
}
