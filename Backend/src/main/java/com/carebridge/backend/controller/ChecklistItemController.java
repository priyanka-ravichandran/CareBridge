package com.carebridge.backend.controller;

import com.carebridge.backend.entity.ChecklistItem;
import com.carebridge.backend.repo.ChecklistItemRepository;
import com.carebridge.backend.service.EmailService;
import jakarta.transaction.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ChecklistItemController {

    private final ChecklistItemRepository checklistItemRepository;
    private final EmailService emailService;

    public ChecklistItemController(ChecklistItemRepository checklistItemRepository, EmailService emailService) {
        this.checklistItemRepository = checklistItemRepository;
        this.emailService = emailService;
    }

    @PostMapping("/checklistItem")
    @CrossOrigin(origins = "*")
    ChecklistItem addChecklistItem(@RequestBody ChecklistItem checklistItem) {
        // emailService.sendEmail(userEmail,"Add","Adding item successful");
        return checklistItemRepository.save(checklistItem);
    }

    @GetMapping("/checklistItem/q")
    @CrossOrigin(origins = "*")
    List<ChecklistItem> getAllChecklistItems(@RequestParam String checklistNumber) {
        return checklistItemRepository.findChecklistItemsByChecklistNumber(checklistNumber);
    }

    @PutMapping("/checklistItem/q")
    @CrossOrigin(origins = "*")
    Optional<ChecklistItem> updateChecklistItem(@RequestBody ChecklistItem newChecklistItem,
                                            @RequestParam String checklistNumber, @RequestParam String itemName) {
        // emailService.sendEmail(userEmail,"Update","Updating item successful");
        return checklistItemRepository.findChecklistItemByChecklistNumberAndItemName(checklistNumber, itemName)
                .map(checklistItem -> {
                    checklistItem.setItemName(newChecklistItem.getItemName());
                    checklistItem.setAmount(newChecklistItem.getAmount());
                    checklistItem.setStatus(newChecklistItem.getStatus());

                    return checklistItemRepository.save(checklistItem);
                });
    }

    @Transactional
    @DeleteMapping("/checklistItem/q")
    @CrossOrigin(origins = "*")
    public long deleteChecklistItem(@RequestParam String checklistNumber, @RequestParam String itemName) {
        // emailService.sendEmail(userEmail,"Delete","Deleting item successful");
        return checklistItemRepository.deleteChecklistItemByChecklistNumberAndItemName(checklistNumber, itemName);
    }
}
