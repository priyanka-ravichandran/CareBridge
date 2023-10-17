package com.carebridge.backend.controller;

import com.carebridge.backend.controller.model.UserID;
import com.carebridge.backend.entity.AppUser;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
public class UserController {

    @PostMapping("/user")
    public ResponseEntity<UserID> createUser(@RequestBody final AppUser appUser) {
        UserID result = new UserID(UUID.randomUUID().toString());
        return ResponseEntity.status(HttpStatus.CREATED)
                .contentType(MediaType.APPLICATION_JSON)
                .body(result);
    }
}
