package com.carebridge.backend.controller;

import com.carebridge.backend.entity.AppUser;
import com.carebridge.backend.entity.Login;
import com.carebridge.backend.exception.UserNotFoundException;
import com.carebridge.backend.repo.AppUserRepository;
import com.carebridge.backend.service.EmailService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@RestController
public class AppUserController {

    private final AppUserRepository appUserRepository;
    private final int BASE_FOR_ID_GENERATE=100000;
    private final int UP_BOUNDARY_FOR_ID_GENERATE=900000;

    private final EmailService emailService;

    public AppUserController(AppUserRepository appUserRepository, EmailService emailService) {
        this.appUserRepository = appUserRepository;
        this.emailService = emailService;
    }

    @PostMapping("/users")
    @CrossOrigin(origins = "*")
    AppUser appUser(@RequestBody AppUser appUser) {
        long seed = appUser.getEmail().hashCode();
        Random random = new Random(seed);
        int code = BASE_FOR_ID_GENERATE + random.nextInt(UP_BOUNDARY_FOR_ID_GENERATE);
        appUser.setPairCode(String.valueOf(code));

        Login login = new Login();
        appUser.setHashedPassword(login.hashPasswordMD5(appUser.getHashedPassword()));
        return appUserRepository.save(appUser);
    }

    @PostMapping("")
    @CrossOrigin(origins = "*")
    int emailUser(@RequestBody String message) {
        emailService.sendEmail("akshat64647@gmail.com","care",message);
        return -1;
    }

    @PostMapping("/login")
    @CrossOrigin(origins = "*")
    int loginUser(@RequestBody Login login) {
        String email = login.getEmail();
        String password = login.hashPasswordMD5(login.getPassword());

        Optional<AppUser> appUser = appUserRepository.findAppUserByEmail(email);
        if (appUser.isEmpty()) {
            return -1;
        } else {
            if (appUser.get().getHashedPassword().equals(password)) {
                return appUser.get().getUserID();
            }
        }
        emailService.sendEmail(email,"Login","You Have Successfully Logged in!");
        return -1;
    }

    @GetMapping("/users")
    @CrossOrigin(origins = "*")
    List<AppUser> all() {return appUserRepository.findAll();}

    @GetMapping("/users/{userId}")
    @CrossOrigin(origins = "*")
    AppUser one(@PathVariable Long userId) {
        return appUserRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
    }


    @GetMapping("/users/q")
    @CrossOrigin(origins = "*")
    AppUser getUserByEmail(@RequestParam String email) {
        return appUserRepository.findAppUserByEmail(email).get();
    }

    @PutMapping("/users/{userId}")
    @CrossOrigin(origins = "*")
    Optional<AppUser> updateUser(@RequestBody AppUser updatedAppUser, @PathVariable int userId) {
        emailService.sendEmail(updatedAppUser.getEmail(),"Update","You Have Successfully Updated Profile");
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
