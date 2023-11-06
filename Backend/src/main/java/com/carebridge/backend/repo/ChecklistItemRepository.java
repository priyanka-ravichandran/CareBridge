package com.carebridge.backend.repo;

import com.carebridge.backend.entity.ChecklistItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChecklistItemRepository extends JpaRepository<ChecklistItem, Long> {
    List<ChecklistItem> findChecklistItemsByChecklistNumber(long checklistNumber);
    Optional<ChecklistItem> findChecklistItemsByChecklistNumberAndItemName(long checklistNumber, String itemName);
    void deleteChecklistItemByChecklistNumberAndItemName(long checklistNumber, String itemName);
}
