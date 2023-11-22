package com.carebridge.backend.controller;

import com.carebridge.backend.entity.Checklist;
import com.carebridge.backend.repo.ChecklistRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class ChecklistControllerTest {

    private ChecklistController checklistController;

    @Mock
    private ChecklistRepository checklistRepository;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        // TODO: Add emailService here
        // checklistController = new ChecklistController(checklistRepository, emailService);
    }

    @Test
    public void testCreateChecklistItem() {
        // Mocking a new checklist item
        Checklist checklistToCreate = new Checklist(1, 2, "1", "New Checklist");
        when(checklistRepository.save(checklistToCreate)).thenReturn(checklistToCreate);
//        Checklist result = checklistController.checklist(checklistToCreate);
//        assertEquals(checklistToCreate.getChecklist_name(), result.getChecklist_name());
//        verify(checklistRepository, times(1)).save(checklistToCreate);
    }

    @Test
    public void testGetAllChecklistItems() {
        List<Checklist> mockChecklists = new ArrayList<>();
        mockChecklists.add(new Checklist(1, 1, "1", "Checklist 1"));
        mockChecklists.add(new Checklist(2, 2, "2", "Checklist 2"));
        when(checklistRepository.findAll()).thenReturn(mockChecklists);

        List<Checklist> result = checklistController.all();

        assertEquals(mockChecklists.size(), result.size());
        assertEquals(mockChecklists.get(0).getChecklist_name(), result.get(0).getChecklist_name());
        assertEquals(mockChecklists.get(1).getChecklist_name(), result.get(1).getChecklist_name());
        verify(checklistRepository, times(1)).findAll();
    }

    @Test
    public void testGetChecklistForGuardianAndElderly() {
        int elderlyId = 123; // Replace with an actual elderly ID for testing
        int guardianId = 123;
        List<Checklist> mockChecklists = new ArrayList<>();
        mockChecklists.add(new Checklist(1, elderlyId, "1", "Checklist 1"));
        mockChecklists.add(new Checklist(2, elderlyId, "2", "Checklist 2"));

        when(checklistRepository.findChecklistByElderlyID(elderlyId)).thenReturn(mockChecklists);

        List<Checklist> result = checklistController.getChecklistForGuardianAndElderly(guardianId, elderlyId);

        assertEquals(mockChecklists.size(), result.size());
        assertEquals(mockChecklists.get(0).getChecklist_name(), result.get(0).getChecklist_name());
        assertEquals(mockChecklists.get(1).getChecklist_name(), result.get(1).getChecklist_name());

        verify(checklistRepository, times(1)).findChecklistByElderlyID(elderlyId);
    }

    @Test
    public void testGetChecklistForElderly() {
        int guardianId = 456; // TODO: Replace with an actual guardian ID for testing
        int elderlyId = 789; // TODO: Replace with an actual elderly ID for testing
        List<Checklist> mockChecklists = new ArrayList<>();

        mockChecklists.add(new Checklist(guardianId, elderlyId, "1", "Checklist 1"));
        mockChecklists.add(new Checklist(guardianId, elderlyId, "2", "Checklist 2"));

        when(checklistRepository.findChecklistByGuardianIDAndElderlyID(guardianId, elderlyId)).thenReturn(mockChecklists);

        List<Checklist> result = checklistController.getChecklistForElderly(elderlyId);

        assertEquals(mockChecklists.size(), result.size());
        assertEquals(mockChecklists.get(0).getChecklist_name(), result.get(0).getChecklist_name());
        assertEquals(mockChecklists.get(1).getChecklist_name(), result.get(1).getChecklist_name());

        verify(checklistRepository, times(1)).findChecklistByGuardianIDAndElderlyID(guardianId, elderlyId);
    }


    @Test
    public void testUpdateChecklistForElderlyGuardianAndNumber() {
        int guardianId = 1;
        int elderlyId = 2;
        String checklistNumber = "ABC";
        Checklist checklistToUpdate = new Checklist(guardianId, elderlyId, checklistNumber, "Old Checklist Name");
        Checklist updatedChecklist = new Checklist(guardianId, elderlyId, checklistNumber, "Updated Checklist Name");
        when(checklistRepository.findChecklistByGuardianIDAndElderlyIDAndChecklistNumber(guardianId, elderlyId, checklistNumber))
                .thenReturn(Optional.of(checklistToUpdate));
        when(checklistRepository.save(any(Checklist.class))).thenReturn(updatedChecklist);
//        Optional<Checklist> result = checklistController.updateChecklistForElderlyGuardianAndNumber(
//                updatedChecklist, guardianId, elderlyId, checklistNumber);
//        assertEquals(updatedChecklist.getChecklist_name(), result.get().getChecklist_name());
//        verify(checklistRepository, times(1))
//                .findChecklistByGuardianIDAndElderlyIDAndChecklistNumber(guardianId, elderlyId, checklistNumber);
//        verify(checklistRepository, times(1)).save(any(Checklist.class));
    }
}