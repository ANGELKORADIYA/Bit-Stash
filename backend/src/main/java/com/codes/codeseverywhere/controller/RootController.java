package com.codes.codeseverywhere.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
public class RootController {

    @GetMapping("/")
    public Map<String, String> welcome() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Welcome to BitStash API");
        response.put("status", "Running");
        return response;
    }
}
