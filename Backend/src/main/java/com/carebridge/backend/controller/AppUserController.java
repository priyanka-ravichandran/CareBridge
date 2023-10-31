package com.carebridge.backend.controller;

import com.carebridge.backend.entity.AppUser;
import com.carebridge.backend.exception.UserNotFoundException;
import com.carebridge.backend.repo.AppUserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @PutMapping("/users/{userId}")
    @CrossOrigin(origins = "*")
    Optional<AppUser> updateUser(@RequestBody AppUser updatedAppUser, @PathVariable int userId) {
        return appUserRepository.findAppUserByUserID(userId)
                .map(appUser -> {
                    appUser.setUserID(userId);
                    appUser.setPhone_number(updatedAppUser.getPhone_number());
                    appUser.setFirst_name(updatedAppUser.getFirst_name());
                    appUser.setLast_name(updatedAppUser.getLast_name());
                    appUser.setEmail(updatedAppUser.getEmail());
                    appUser.setBirthdate(updatedAppUser.getBirthdate());
                    appUser.setAddress(updatedAppUser.getAddress());
                    appUser.setGender(updatedAppUser.getGender());
                    return appUserRepository.save(appUser);
                });
    }
}
