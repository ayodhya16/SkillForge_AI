package com.mahesh.skillForge.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "course_sections")
public class CourseSection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    // Order of section inside course
    private int orderIndex;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;

    @OneToMany(
            mappedBy = "section",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @OrderBy("orderIndex ASC")
    private List<CourseContent> contents;

    // ===== Getters & Setters =====

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getOrderIndex() {
        return orderIndex;
    }

    public void setOrderIndex(int orderIndex) {
        this.orderIndex = orderIndex;
    }


    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public List<CourseContent> getContents() {
        return contents;
    }

    public void setContents(List<CourseContent> contents) {
        this.contents = contents;
    }
    public void addContent(CourseContent content) {
        contents.add(content);
        content.setSection(this);
    }
    public void removeContent(CourseContent content) {
        contents.remove(content);
        content.setSection(null);
    }
    public void clearContents() {
        for (CourseContent content : contents) {
            content.setSection(null);
        }
        contents.clear();
    }
    public void reorderContents() {
        for (int i = 0; i < contents.size(); i++) {
            contents.get(i).setOrderIndex(i + 1);
        }
    }
    
    
}
