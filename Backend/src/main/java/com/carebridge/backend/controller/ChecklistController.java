package com.carebridge.backend.controller;

import com.carebridge.backend.entity.Checklist;
import com.carebridge.backend.repo.ChecklistRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ChecklistController {

    private final ChecklistRepository checklistRepository;

    public ChecklistController(ChecklistRepository checklistRepository) {
        this.checklistRepository = checklistRepository;
    }

    @PostMapping("/checklist")
    @CrossOrigin(origins = "*")
    Checklist checklist(@RequestBody Checklist checklist) {
        return checklistRepository.save(checklist);
    }

    @GetMapping("/checklist")
    @CrossOrigin(origins = "*")
    List<Checklist> all() {
        return checklistRepository.findAll();
    }

    @GetMapping("/checklist/q")
    @CrossOrigin(origins = "*")
    List<Checklist> getChecklistForGuardianAndElderly(@RequestParam int guardianId, @RequestParam int elderlyId) {
        return checklistRepository.findChecklistByGuardianIDAndElderlyID(guardianId, elderlyId);
    }

    @PutMapping("/checklist/q")
    @CrossOrigin(origins = "*")
    Optional<Checklist> updateChecklistItem(@RequestBody Checklist newChecklist, @RequestParam int guardianId, @RequestParam int elderlyId,
                              @RequestParam int checkListNum, @RequestParam String itemName) {
        return checklistRepository.findChecklistByGuardianIDAndElderlyIDAndChecklistNumAndItemName(guardianId, elderlyId, checkListNum, itemName)
                .map(checklist -> {
                    checklist.setElderlyID(newChecklist.getElderlyID());
                    checklist.setChecklistNum(newChecklist.getChecklistNum());
                    checklist.setGuardianID(newChecklist.getGuardianID());
                    checklist.setItemName(newChecklist.getItemName());
                    checklist.setAmount(newChecklist.getAmount());
                    checklist.setStatus(newChecklist.getStatus());
                    return checklistRepository.save(checklist);
                });
    }

    @DeleteMapping("/checklist/q")
    void deleteChecklistItem(@RequestParam int checkListNum, @RequestParam String itemName) {
        checklistRepository.deleteAllByChecklistNumAndItemName(checkListNum, itemName);
    }
}
