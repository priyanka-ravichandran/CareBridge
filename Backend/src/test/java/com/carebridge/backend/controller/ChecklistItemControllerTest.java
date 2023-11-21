package com.carebridge.backend.controller;

import com.carebridge.backend.controller.ChecklistItemController;
import com.carebridge.backend.entity.ChecklistItem;
import com.carebridge.backend.repo.ChecklistItemRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ChecklistItemControllerTest {

    @Mock
    private ChecklistItemRepository checklistItemRepository;

    @InjectMocks
    private ChecklistItemController checklistItemController;

    @Test
    public void testAddChecklistItem() {
        ChecklistItem newItem = new ChecklistItem("123", "Item1", 5, 0);

        when(checklistItemRepository.save(any(ChecklistItem.class))).thenReturn(newItem);

        ChecklistItem result = checklistItemController.addChecklistItem(newItem);

        assertNotNull(result);
        assertEquals(newItem.getItemName(), result.getItemName());
        assertEquals(newItem.getAmount(), result.getAmount());
        assertEquals(newItem.getStatus(), result.getStatus());
    }

    @Test
    public void testGetAllChecklistItems() {
        String checklistNumber = "123";
        List<ChecklistItem> itemList = new ArrayList<>();
        // Add mock checklist items for the given checklist number
        // ... add items to the list

        when(checklistItemRepository.findChecklistItemsByChecklistNumber(checklistNumber)).thenReturn(itemList);

        List<ChecklistItem> result = checklistItemController.getAllChecklistItems(checklistNumber);

        assertEquals(itemList.size(), result.size());
    }

    @Test
    public void testUpdateChecklistItem() {
        String checklistNumber = "123";
        String itemName = "Item1";
        ChecklistItem updatedItem = new ChecklistItem(checklistNumber, itemName, 10, 1);

        when(checklistItemRepository.findChecklistItemByChecklistNumberAndItemName(checklistNumber, itemName))
                .thenReturn(Optional.of(new ChecklistItem(checklistNumber, itemName, 5, 0)));
        when(checklistItemRepository.save(any(ChecklistItem.class))).thenReturn(updatedItem);

        Optional<ChecklistItem> result = checklistItemController.updateChecklistItem(updatedItem, checklistNumber, itemName);

        assertTrue(result.isPresent());
        assertEquals(updatedItem.getAmount(), result.get().getAmount());
        assertEquals(updatedItem.getStatus(), result.get().getStatus());
    }

    @Test
    public void testDeleteChecklistItem() {
        String checklistNumber = "123";
        String itemName = "Item1";

        when(checklistItemRepository.deleteChecklistItemByChecklistNumberAndItemName(checklistNumber, itemName))
                .thenReturn(1L);

        long result = checklistItemController.deleteChecklistItem(checklistNumber, itemName);

        assertEquals(1L, result);
    }
    @Test
    public void testAddChecklistItem_Exception() {
        ChecklistItem newItem = new ChecklistItem("123", "Item1", 5, 0);

        when(checklistItemRepository.save(any(ChecklistItem.class))).thenThrow(RuntimeException.class);

        assertThrows(RuntimeException.class, () -> checklistItemController.addChecklistItem(newItem));
    }

    @Test
    public void testGetAllChecklistItems_EmptyList() {
        String checklistNumber = "123";

        when(checklistItemRepository.findChecklistItemsByChecklistNumber(checklistNumber)).thenReturn(new ArrayList<>());

        List<ChecklistItem> result = checklistItemController.getAllChecklistItems(checklistNumber);

        assertNotNull(result);
        assertEquals(0, result.size());
    }

    @Test
    public void testUpdateChecklistItem_NotFound() {
        String checklistNumber = "123";
        String itemName = "Item1";
        ChecklistItem updatedItem = new ChecklistItem(checklistNumber, itemName, 10, 1);

        when(checklistItemRepository.findChecklistItemByChecklistNumberAndItemName(checklistNumber, itemName))
                .thenReturn(Optional.empty());

        Optional<ChecklistItem> result = checklistItemController.updateChecklistItem(updatedItem, checklistNumber, itemName);

        assertFalse(result.isPresent());
    }

    @Test
    public void testDeleteChecklistItem_NotFound() {
        String checklistNumber = "123";
        String itemName = "Item1";

        when(checklistItemRepository.deleteChecklistItemByChecklistNumberAndItemName(checklistNumber, itemName))
                .thenReturn(0L);

        long result = checklistItemController.deleteChecklistItem(checklistNumber, itemName);

        assertEquals(0L, result);
    }
}