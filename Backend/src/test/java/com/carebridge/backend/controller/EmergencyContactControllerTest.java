package com.carebridge.backend.controller;

import com.carebridge.backend.entity.Elderly;
import com.carebridge.backend.repo.EmergencyContactRepository;
import com.carebridge.backend.service.EmailService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class EmergencyContactControllerTest {

    @Mock
    private EmergencyContactRepository emergencyContactRepository;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private EmergencyContactController emergencyContactController;

    @Test
    void testAddContact() {
        Elderly elderly = new Elderly(/* Create an Elderly object with necessary arguments */);
        when(emergencyContactRepository.save(any(Elderly.class))).thenReturn(elderly);

        Elderly savedElderly = emergencyContactController.addContact(elderly, "test@example.com");

        assertEquals(elderly, savedElderly);
    }

    @Test
    void testAllContactsEmptyList() {
        when(emergencyContactRepository.findAll()).thenReturn(Arrays.asList());

        List<Elderly> elderlyList = emergencyContactController.allContact();

        assertEquals(0, elderlyList.size());
    }


    @Test
    void testEditContact() {
        Elderly existingElderly = new Elderly(/* Create an existing Elderly object */);
        Elderly updatedElderly = new Elderly(/* Create an updated Elderly object */);
        when(emergencyContactRepository.findElderlyByGuardianIdAndElderlyId(eq(existingElderly.getGuardianId()), eq(existingElderly.getElderlyId())))
                .thenReturn(Optional.of(existingElderly));
        when(emergencyContactRepository.save(any(Elderly.class))).thenReturn(updatedElderly);

        Optional<Elderly> editedElderly = emergencyContactController.editContact(updatedElderly,
                existingElderly.getGuardianId(), existingElderly.getElderlyId(), "test@example.com");

        assertEquals(updatedElderly, editedElderly.orElse(null));
    }

}
