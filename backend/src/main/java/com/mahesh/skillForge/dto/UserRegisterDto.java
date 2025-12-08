package com.mahesh.skillForge.dto;

public class UserRegisterDto {
    private String name;
    private String email;
    private String password;
    private String role; // "ADMIN" | "INSTRUCTOR" | "STUDENT"
    private String phoneNumber;

    // getters and setters
    public UserRegisterDto() {}

    // getters
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public String getRole() { return role; }
    public String getPhoneNumber() { return phoneNumber; }

    // setters
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public void setRole(String role) { this.role = role; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

}
