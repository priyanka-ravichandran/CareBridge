package com.carebridge.backend.controller;

import com.carebridge.backend.entity.AppUser;
import com.carebridge.backend.exception.UserNotFoundException;
import com.carebridge.backend.repo.AppUserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AppUserController {

    private final AppUserRepository appUserRepository;

    public AppUserController(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    @PostMapping("/users")
    @CrossOrigin(origins = "*")
    AppUser appUser(@RequestBody AppUser appUser) {
        return appUserRepository.save(appUser);
    }

    @GetMapping("/users")
    @CrossOrigin(origins = "*")
    List<AppUser> all() {
        return appUserRepository.findAll();
    }

    @GetMapping("/users/{userId}")
    @CrossOrigin(origins = "*")
    AppUser one(@PathVariable Long userId) {
        return appUserRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
    }
}
