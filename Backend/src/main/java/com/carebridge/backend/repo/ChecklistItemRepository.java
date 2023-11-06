package com.carebridge.backend.repo;

import com.carebridge.backend.entity.ChecklistItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChecklistItemRepository extends JpaRepository<ChecklistItem, String> {
    List<ChecklistItem> findChecklistItemsByChecklistNumber(String checklistNumber);
    Optional<ChecklistItem> findChecklistItemByChecklistNumberAndItemName(String checklistNumber, String itemName);
    void deleteChecklistItemByChecklistNumberAndItemName(String checklistNumber, String itemName);
}
