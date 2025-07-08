package com.codes.codeseverywhere.model;

import jakarta.persistence.*;
//import jakarta
import java.time.LocalDateTime;

@Entity
@Table(name = "codes")
public class Codes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String code;
    private String type;
    private String title;
    private String description;
    private boolean visibility;


//    @Column(name = "created_at", updatable = false, insertable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Codes() {

    }

    public Codes( String code , String type, String title, String description , String username , boolean visibility) {
        this.username = username;
        this.code = code;
        this.type = type;
        this.title = title;
        this.description = description;
        this.visibility = visibility;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCode() {
        return code;
    }
    public void setCode(String code) {
        this.code = code;

    }
    public LocalDateTime getCreatedAt() {
        return createdAt;

    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;

    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public boolean isVisibility() {
        return visibility;
    }

    public void setVisibility(boolean visibility) {
        this.visibility = visibility;
    }

    public String toString(){
        return "name: " + username + " code: " + code + " createdAt: " + createdAt + " type: " + type + " title: " + title + " description: " + description +" visibility: " + visibility;
    }
}

