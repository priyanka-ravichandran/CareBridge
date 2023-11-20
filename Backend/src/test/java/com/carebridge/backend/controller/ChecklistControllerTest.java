package com.carebridge.backend.controller;

import com.carebridge.backend.entity.Checklist;
import com.carebridge.backend.repo.ChecklistRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.verify;

class ChecklistControllerTest {

    private ChecklistController checklistController;

    @Mock
    private ChecklistRepository checklistRepository;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        checklistController = new ChecklistController(checklistRepository, emailService);
    }

    @Test
    void testCreateChecklistItem() {
        Checklist checklist = new Checklist(1, 2, 3, "Test Item", 5);
        Mockito.when(checklistRepository.save(checklist)).thenReturn(checklist);

        Checklist result = checklistController.checklist(checklist);

        assertEquals(checklist, result);
    }

    @Test
    void testGetAllChecklistItems() {
        List<Checklist> checklistItems = new ArrayList<>();
        checklistItems.add(new Checklist(1, 2, 3, "Item 1", 5));
        checklistItems.add(new Checklist(1, 2, 3, "Item 2", 3));

        Mockito.when(checklistRepository.findAll()).thenReturn(checklistItems);

        List<Checklist> result = checklistController.all();

        assertEquals(checklistItems, result);
    }

    @Test
    void testGetChecklistForGuardianAndElderly() {
        int guardianId = 1;
        int elderlyId = 2;
        List<Checklist> checklistItems = new ArrayList<>();
        checklistItems.add(new Checklist(1, 2, 3, "Item 1", 5));
        checklistItems.add(new Checklist(1, 2, 3, "Item 2", 3));

        Mockito.when(checklistRepository.findChecklistByGuardianIDAndElderlyID(guardianId, elderlyId)).thenReturn(checklistItems);

        List<Checklist> result = checklistController.getChecklistForGuardianAndElderly(guardianId, elderlyId);

        assertEquals(checklistItems, result);
    }

    @Test
    void testUpdateChecklistItem() {
        int guardianId = 1;
        int elderlyId = 2;
        int checklistNum = 3;
        String itemName = "Test Item";

        Checklist existingChecklist = new Checklist(guardianId, elderlyId, checklistNum, itemName, 5);
        Checklist updatedChecklist = new Checklist(guardianId, elderlyId, checklistNum, itemName, 10);

        Mockito.when(checklistRepository.findChecklistByGuardianIDAndElderlyIDAndChecklistNumAndItemName(guardianId, elderlyId, checklistNum, itemName))
                .thenReturn(Optional.of(existingChecklist));
        Mockito.when(checklistRepository.save(existingChecklist)).thenReturn(updatedChecklist);

        Optional<Checklist> result = checklistController.updateChecklistItem(updatedChecklist, guardianId, elderlyId, checklistNum, itemName);

        assertNotNull(result);
        assertEquals(updatedChecklist, result.orElse(null));
    }
}