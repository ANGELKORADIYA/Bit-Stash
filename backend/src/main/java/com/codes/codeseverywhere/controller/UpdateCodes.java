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

    @GetMapping("/snippets/explore")
    public ResponseEntity<List<Codes>> getCodes(@RequestParam(defaultValue = "10") int size) {
        return new ResponseEntity<>(service.getCodes(size),HttpStatus.OK);
    }

    @PostMapping("/snippets/stash")
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

    @PostMapping("/snippets/my-stash")
    public ResponseEntity<List<Codes>> userPosts(@RequestBody Login user, @RequestParam(defaultValue = "ALL") String filter) {
        Login authenticated = userService.loginSignup(user);
        if(authenticated == null){
            return new ResponseEntity<>(Collections.emptyList(),HttpStatus.UNAUTHORIZED);
        }
        
        if ("SHARED_WITH_ME".equalsIgnoreCase(filter)) {
            return new ResponseEntity<>(service.getSharedWithMe(authenticated.getEmail()), HttpStatus.OK);
        }
        
        return new ResponseEntity<>(service.getCodesByStatus(authenticated.getUsername(), filter), HttpStatus.OK);
    }

    @PostMapping("/snippets/{id}/archive")
    public ResponseEntity<Codes> archiveCode(@PathVariable Long id, @RequestBody Login user) {
        Login authenticated = userService.loginSignup(user);
        if(authenticated == null) return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        
        Codes archived = service.archiveCode(id, authenticated.getUsername());
        return archived != null ? new ResponseEntity<>(archived, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/snippets/{id}/share")
    public ResponseEntity<Codes> grantAccess(@PathVariable Long id, @RequestParam String email, @RequestBody Login user) {
        Login authenticated = userService.loginSignup(user);
        if(authenticated == null) return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        
        Codes updated = service.grantAccess(id, authenticated.getUsername(), email);
        return updated != null ? new ResponseEntity<>(updated, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/snippets/{id}/revoke")
    public ResponseEntity<Codes> revokeAccess(@PathVariable Long id, @RequestParam String email, @RequestBody Login user) {
        Login authenticated = userService.loginSignup(user);
        if(authenticated == null) return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        
        Codes updated = service.revokeAccess(id, authenticated.getUsername(), email);
        return updated != null ? new ResponseEntity<>(updated, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/identity/generate")
    public ResponseEntity<String> generateEmail() {
        return new ResponseEntity<>(userService.generateUniqueEmail(), HttpStatus.OK);
    }
}
