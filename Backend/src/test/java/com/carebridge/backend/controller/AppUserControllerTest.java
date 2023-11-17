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

class AppUserControllerTest {

    private AppUserController appUserController;

    @Mock
    private AppUserRepository appUserRepository;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        appUserController = new AppUserController(appUserRepository);
    }

    @Test
    void testCreateUser() {
        AppUser appUser = new AppUser();
        appUser.setUserID(1);
        Mockito.when(appUserRepository.save(appUser)).thenReturn(appUser);

        AppUser result = appUserController.appUser(appUser);

        assertEquals(appUser, result);
    }

    @Test
    void testGetAllUsers() {
        List<AppUser> userList = new ArrayList<>();
        userList.add(new AppUser());
        userList.add(new AppUser());

        Mockito.when(appUserRepository.findAll()).thenReturn(userList);

        List<AppUser> result = appUserController.all();

        assertEquals(userList, result);
    }

    @Test
    void testGetUserById() {
        Long userId = 1L;
        AppUser appUser = new AppUser();
        appUser.setUserID(Math.toIntExact(userId));
        Mockito.when(appUserRepository.findById(userId)).thenReturn(Optional.of(appUser));

        AppUser result = appUserController.one(userId);

        assertEquals(appUser, result);
    }

    @Test
    void testGetUserByIdUserNotFoundException() {
        Long userId = 1L;

        Mockito.when(appUserRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> {
            appUserController.one(userId);
        });
    }
}