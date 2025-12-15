package com.mahesh.skillForge.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "placements")
public class Placement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User student;

    private String company;
    private String jobRole;
    private double packageLPA;
    private LocalDate placedOn;

    // getters & setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getStudent() { return student; }
    public void setStudent(User student) { this.student = student; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getJobRole() { return jobRole; }
    public void setJobRole(String jobRole) { this.jobRole = jobRole; }

    public double getPackageLPA() { return packageLPA; }
    public void setPackageLPA(double packageLPA) { this.packageLPA = packageLPA; }

    public LocalDate getPlacedOn() { return placedOn; }
    public void setPlacedOn(LocalDate placedOn) { this.placedOn = placedOn; }
}
