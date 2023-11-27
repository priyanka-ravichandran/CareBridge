package com.carebridge.backend.controller;

import com.carebridge.backend.entity.ChecklistItem;
import com.carebridge.backend.repo.ChecklistItemRepository;
import com.carebridge.backend.service.EmailService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ChecklistItemControllerTest {

    @Mock
    private ChecklistItemRepository checklistItemRepository;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private ChecklistItemController checklistItemController;

    @Test
    void testAddChecklistItem() {
        ChecklistItem checklistItem = new ChecklistItem("123", "Item 1", 2, 1);
        String userEmail = "test@example.com";

        when(checklistItemRepository.save(any(ChecklistItem.class))).thenReturn(checklistItem);

        ChecklistItem savedChecklistItem = checklistItemController.addChecklistItem(checklistItem, userEmail);

        assertEquals("123", savedChecklistItem.getChecklistNumber());
        assertEquals("Item 1", savedChecklistItem.getItemName());
        assertEquals(2, savedChecklistItem.getAmount());
        assertEquals(1, savedChecklistItem.getStatus());

        verify(emailService, times(1)).sendEmail(userEmail, "Add", "Adding item successful");
        verify(checklistItemRepository, times(1)).save(any(ChecklistItem.class));
    }

    @Test
    void testGetAllChecklistItems() {
        String checklistNumber = "123";
        ChecklistItem checklistItem = new ChecklistItem(checklistNumber, "Item 1", 2, 1);

        when(checklistItemRepository.findChecklistItemsByChecklistNumber(checklistNumber))
                .thenReturn(Collections.singletonList(checklistItem));

        List<ChecklistItem> result = checklistItemController.getAllChecklistItems(checklistNumber);

        assertEquals(1, result.size());
        ChecklistItem retrievedChecklistItem = result.get(0);
        assertEquals("123", retrievedChecklistItem.getChecklistNumber());
        assertEquals("Item 1", retrievedChecklistItem.getItemName());
        assertEquals(2, retrievedChecklistItem.getAmount());
        assertEquals(1, retrievedChecklistItem.getStatus());

        verify(checklistItemRepository, times(1)).findChecklistItemsByChecklistNumber(checklistNumber);
    }

    @Test
    void testUpdateChecklistItem() {
        String checklistNumber = "123";
        String itemName = "Item 1";
        ChecklistItem existingChecklistItem = new ChecklistItem(checklistNumber, itemName, 2, 1);
        ChecklistItem updatedChecklistItem = new ChecklistItem(checklistNumber, itemName, 5, 0);

        when(checklistItemRepository.findChecklistItemByChecklistNumberAndItemName(checklistNumber, itemName))
                .thenReturn(Optional.of(existingChecklistItem));
        when(checklistItemRepository.save(any(ChecklistItem.class))).thenReturn(updatedChecklistItem);

        Optional<ChecklistItem> result = checklistItemController.updateChecklistItem(updatedChecklistItem,
                checklistNumber, itemName, "test@example.com");

        assertNotNull(result);
        ChecklistItem modifiedChecklistItem = result.orElse(null);
        assertNotNull(modifiedChecklistItem);
        assertEquals("123", modifiedChecklistItem.getChecklistNumber());
        assertEquals("Item 1", modifiedChecklistItem.getItemName());
        assertEquals(5, modifiedChecklistItem.getAmount());
        assertEquals(0, modifiedChecklistItem.getStatus());

        verify(emailService, times(1)).sendEmail("test@example.com", "Update", "Updating item successful");
        verify(checklistItemRepository, times(1)).findChecklistItemByChecklistNumberAndItemName(checklistNumber, itemName);
        verify(checklistItemRepository, times(1)).save(any(ChecklistItem.class));
    }

    @Test
    void testDeleteChecklistItem() {
        String checklistNumber = "123";
        String itemName = "Item 1";

        when(checklistItemRepository.deleteChecklistItemByChecklistNumberAndItemName(checklistNumber, itemName))
                .thenReturn(1L);

        long result = checklistItemController.deleteChecklistItem(checklistNumber, itemName, "test@example.com");

        assertEquals(1L, result);

        verify(emailService, times(1)).sendEmail("test@example.com", "Delete", "Deleting item successful");
        verify(checklistItemRepository, times(1)).deleteChecklistItemByChecklistNumberAndItemName(checklistNumber, itemName);
    }
}