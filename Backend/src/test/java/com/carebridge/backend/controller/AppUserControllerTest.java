package com.carebridge.backend.controller;


import com.carebridge.backend.entity.AppUser;
import com.carebridge.backend.exception.UserNotFoundException;
import com.carebridge.backend.repo.AppUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

import com.carebridge.backend.controller.AppUserController;
import com.carebridge.backend.entity.AppUser;
import com.carebridge.backend.entity.Login;
import com.carebridge.backend.exception.UserNotFoundException;
import com.carebridge.backend.repo.AppUserRepository;
import com.carebridge.backend.service.EmailService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AppUserControllerTest {

    @Mock
    private AppUserRepository appUserRepository;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private AppUserController appUserController;

    @Test
    void testAppUser() {
        AppUser appUser = new AppUser(1, "1234567890", "John", "Doe",
                "john@example.com", new Date(), "type", "hashedPassword", "address", 1, "pairCode");

        when(appUserRepository.save(any(AppUser.class))).thenReturn(appUser);

        AppUser savedUser = appUserController.appUser(appUser);

        assertNotNull(savedUser);
        assertEquals("John", savedUser.getFirst_name());
        assertEquals("Doe", savedUser.getLast_name());
        assertEquals("john@example.com", savedUser.getEmail());
        assertNotNull(savedUser.getPairCode());

        verify(appUserRepository, times(1)).save(any(AppUser.class));
    }


    @Test
    void testLoginUser() {
        Login login = new Login("john@example.com", "password");

        AppUser appUser = new AppUser(1, "1234567890", "John", "Doe",
                "john@example.com", new Date(), "type", "hashedPassword", "address", 1, "pairCode");

        when(appUserRepository.findAppUserByEmail(anyString())).thenReturn(Optional.of(appUser));

        int result = appUserController.loginUser(login);

        assertEquals(-1, result);

        verify(appUserRepository, times(1)).findAppUserByEmail(anyString());
    }

    @Test
    void testAll() {
        AppUser appUser = new AppUser(1, "1234567890", "John", "Doe",
                "john@example.com", new Date(), "type", "hashedPassword", "address", 1, "pairCode");

        when(appUserRepository.findAll()).thenReturn(Collections.singletonList(appUser));

        List<AppUser> result = appUserController.all();

        assertEquals(1, result.size());

        verify(appUserRepository, times(1)).findAll();
    }

    @Test
    void testOne() {
        long userId = 1L;
        AppUser appUser = new AppUser(1, "1234567890", "John", "Doe",
                "john@example.com", new Date(), "type", "hashedPassword", "address", 1, "pairCode");

        when(appUserRepository.findById(userId)).thenReturn(Optional.of(appUser));

        AppUser result = appUserController.one(userId);

        assertNotNull(result);
        assertEquals("John", result.getFirst_name());
        assertEquals("Doe", result.getLast_name());
        assertEquals("john@example.com", result.getEmail());

        verify(appUserRepository, times(1)).findById(userId);
    }

    @Test
    void testGetUserByEmail() {
        String email = "john@example.com";
        AppUser appUser = new AppUser(1, "1234567890", "John", "Doe",
                "john@example.com", new Date(), "type", "hashedPassword", "address", 1, "pairCode");

        when(appUserRepository.findAppUserByEmail(email)).thenReturn(Optional.of(appUser));

        AppUser result = appUserController.getUserByEmail(email);

        assertNotNull(result);
        assertEquals("John", result.getFirst_name());
        assertEquals("Doe", result.getLast_name());
        assertEquals("john@example.com", result.getEmail());

        verify(appUserRepository, times(1)).findAppUserByEmail(email);
    }

    @Test
    void testUpdateUser() {
        int userId = 1;
        AppUser updatedAppUser = new AppUser(userId, "1234567890", "John", "Doe",
                "john@example.com", new Date(), "type", "hashedPassword", "address", 1, "pairCode");

        AppUser existingAppUser = new AppUser(userId, "9876543210", "Jane", "Doe",
                "jane@example.com", new Date(), "type", "hashedPassword", "address", 2, "pairCode");

        when(appUserRepository.findAppUserByUserID(userId)).thenReturn(Optional.of(existingAppUser));
        when(appUserRepository.save(any(AppUser.class))).thenReturn(updatedAppUser);

        Optional<AppUser> result = appUserController.updateUser(updatedAppUser, userId);

        assertTrue(result.isPresent());
        AppUser savedUser = result.get();
        assertEquals(userId, savedUser.getUserID());
        assertEquals("John", savedUser.getFirst_name());
        assertEquals("Doe", savedUser.getLast_name());
        assertEquals("john@example.com", savedUser.getEmail());

        verify(emailService, times(1)).sendEmail(anyString(), anyString(), anyString());
        verify(appUserRepository, times(1)).findAppUserByUserID(userId);
        verify(appUserRepository, times(1)).save(any(AppUser.class));
    }
}