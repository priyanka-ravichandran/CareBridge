package com.carebridge.backend.controller;

import com.carebridge.backend.entity.Checklist;
import com.carebridge.backend.repo.ChecklistRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

import com.carebridge.backend.service.EmailService;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;

@ExtendWith(MockitoExtension.class)
class ChecklistControllerTest {

    @Mock
    private ChecklistRepository checklistRepository;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private ChecklistController checklistController;

    @Test
    void testChecklist() {
        Checklist checklist = new Checklist(1, 2, "123", "Checklist Name");
        String userEmail = "test@example.com";

        when(checklistRepository.save(any(Checklist.class))).thenReturn(checklist);

        Checklist savedChecklist = checklistController.checklist(checklist, userEmail);

        assertEquals(1, savedChecklist.getGuardian_id());
        assertEquals(2, savedChecklist.getElderly_id());
        assertEquals("123", savedChecklist.getChecklist_number());
        assertEquals("Checklist Name", savedChecklist.getChecklist_name());

        verify(emailService, times(1)).sendEmail(userEmail, "Add", "Adding CheckList was successful");
        verify(checklistRepository, times(1)).save(any(Checklist.class));
    }

    @Test
    void testAll() {
        Checklist checklist = new Checklist(1, 2, "123", "Checklist Name");

        when(checklistRepository.findAll()).thenReturn(Collections.singletonList(checklist));

        List<Checklist> result = checklistController.all();

        assertEquals(1, result.size());
        Checklist retrievedChecklist = result.get(0);
        assertEquals(1, retrievedChecklist.getGuardian_id());
        assertEquals(2, retrievedChecklist.getElderly_id());
        assertEquals("123", retrievedChecklist.getChecklist_number());
        assertEquals("Checklist Name", retrievedChecklist.getChecklist_name());

        verify(checklistRepository, times(1)).findAll();
    }

    @Test
    void testGetChecklistForElderly() {
        // Mocking data
        int elderlyId = 1;
        Checklist checklist = new Checklist(1, elderlyId, "123", "Checklist Name");

        when(checklistRepository.findChecklistByElderlyID(elderlyId)).thenReturn(Collections.singletonList(checklist));

        // Testing
        List<Checklist> result = checklistController.getChecklistForElderly(elderlyId);

        assertEquals(1, result.size());
        Checklist retrievedChecklist = result.get(0);
        assertEquals(1, retrievedChecklist.getGuardian_id());
        assertEquals(elderlyId, retrievedChecklist.getElderly_id());
        assertEquals("123", retrievedChecklist.getChecklist_number());
        assertEquals("Checklist Name", retrievedChecklist.getChecklist_name());

        verify(checklistRepository, times(1)).findChecklistByElderlyID(elderlyId);
    }

    @Test
    void testGetChecklistForGuardianAndElderly() {
        int guardianId = 1;
        int elderlyId = 2;
        Checklist checklist = new Checklist(guardianId, elderlyId, "123", "Checklist Name");

        when(checklistRepository.findChecklistByGuardianIDAndElderlyID(guardianId, elderlyId))
                .thenReturn(Collections.singletonList(checklist));

        List<Checklist> result = checklistController.getChecklistForGuardianAndElderly(guardianId, elderlyId);

        assertEquals(1, result.size());
        Checklist retrievedChecklist = result.get(0);
        assertEquals(guardianId, retrievedChecklist.getGuardian_id());
        assertEquals(elderlyId, retrievedChecklist.getElderly_id());
        assertEquals("123", retrievedChecklist.getChecklist_number());
        assertEquals("Checklist Name", retrievedChecklist.getChecklist_name());

        verify(checklistRepository, times(1)).findChecklistByGuardianIDAndElderlyID(guardianId, elderlyId);
    }

    @Test
    void testUpdateChecklistForElderlyGuardianAndNumber() {
        int guardianId = 1;
        int elderlyId = 2;
        String checklistNumber = "123";
        String guardianEmail = "guardian@example.com";

        Checklist existingChecklist = new Checklist(guardianId, elderlyId, checklistNumber, "Checklist Name");
        Checklist updatedChecklist = new Checklist(guardianId, elderlyId, checklistNumber, "Updated Checklist");

        when(checklistRepository.findChecklistByGuardianIDAndElderlyIDAndChecklistNumber(guardianId, elderlyId, checklistNumber))
                .thenReturn(Optional.of(existingChecklist));
        when(checklistRepository.save(any(Checklist.class))).thenReturn(updatedChecklist);

        Optional<Checklist> result = checklistController.updateChecklistForElderlyGuardianAndNumber(updatedChecklist,
                guardianId, elderlyId, checklistNumber, guardianEmail);

        assertTrue(result.isPresent());
        Checklist modifiedChecklist = result.get();
        assertEquals(guardianId, modifiedChecklist.getGuardian_id());
        assertEquals(elderlyId, modifiedChecklist.getElderly_id());
        assertEquals(checklistNumber, modifiedChecklist.getChecklist_number());
        assertEquals("Updated Checklist", modifiedChecklist.getChecklist_name());

        verify(emailService, times(1)).sendEmail(guardianEmail, "Update", "Updating CheckList successful");
        verify(checklistRepository, times(1)).findChecklistByGuardianIDAndElderlyIDAndChecklistNumber(guardianId, elderlyId, checklistNumber);
        verify(checklistRepository, times(1)).save(any(Checklist.class));
    }

    @Test
    void testDeleteChecklist() {
        String checklistNumber = "123";
        String userEmail = "test@example.com";

        checklistController.deleteChecklist(checklistNumber, userEmail);

        verify(emailService, times(1)).sendEmail(userEmail, "Delete", "Deleting the CheckList successful");
        verify(checklistRepository, times(1)).deleteChecklistByChecklistNumber(checklistNumber);
    }
}