package com.codes.codeseverywhere.controller;

import com.codes.codeseverywhere.model.Codes;
import com.codes.codeseverywhere.model.DetailedCode;
import com.codes.codeseverywhere.model.Login;
import com.codes.codeseverywhere.services.LoginService;
import com.codes.codeseverywhere.services.UploadService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.codes.codeseverywhere.model.Okk;

import java.util.Collections;
import java.util.List;


@RestController
@CrossOrigin
@RequestMapping("/api")
public class UpdateCodes {
    private final UploadService service;
    private final LoginService userService;
    UpdateCodes(UploadService service , LoginService userService) {
        this.service = service;
        this.userService = userService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Codes>> getCodes(@RequestParam(defaultValue = "10") int size) {
        return new ResponseEntity<>(service.getCodes(size),HttpStatus.OK);
    }

    @PostMapping("/upload")
    public ResponseEntity<Okk> newCode(@RequestBody DetailedCode detailedCode) {
        Login user = detailedCode.getLogin();
        if(userService.loginSignup(user)==null){
            return new ResponseEntity<>(new Okk(false),HttpStatus.UNAUTHORIZED);
        }
        Codes code = detailedCode.getCodes();
        if(code.getUsername()==null){
            code.setUsername(user.getUsername());
        }
        service.saveDB(code);
        return new ResponseEntity<>(new Okk(true),HttpStatus.CREATED);
    }
    @PostMapping("user-posts")
    public ResponseEntity<List<Codes>> newUser(@RequestBody Login user) {
        if(userService.loginSignup(user)==null){
            return new ResponseEntity<>(Collections.emptyList(),HttpStatus.UNAUTHORIZED);
        }
    else{
            return new ResponseEntity<>(service.getCodesById(user.getUsername()),HttpStatus.OK);
        }
    }
    }
