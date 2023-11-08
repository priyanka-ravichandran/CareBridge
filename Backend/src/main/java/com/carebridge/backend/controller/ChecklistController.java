package com.carebridge.backend.controller;

import com.carebridge.backend.entity.Checklist;
import com.carebridge.backend.repo.ChecklistRepository;
import jakarta.transaction.Transactional;
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

    @GetMapping("/checklist/{elderlyId}")
    @CrossOrigin(origins = "*")
    List<Checklist> getChecklistForGuardianAndElderly(@PathVariable int elderlyId) {
        return checklistRepository.findChecklistByElderlyID(elderlyId);
    }

    @GetMapping("/checklist/q")
    @CrossOrigin(origins = "*")
    List<Checklist> getChecklistForElderly(@RequestParam int guardianId, @RequestParam int elderlyId) {
        return checklistRepository.findChecklistByGuardianIDAndElderlyID(guardianId, elderlyId);
    }

    @PutMapping("/checklist/q")
    @CrossOrigin(origins = "*")
    Optional<Checklist> updateChecklistForElderlyGuardianAndNumber(@RequestBody Checklist newChecklist
            , @RequestParam int guardianId, @RequestParam int elderlyId, @RequestParam String checklistNumber) {
        return checklistRepository.findChecklistByGuardianIDAndElderlyIDAndChecklistNumber(guardianId, elderlyId, checklistNumber)
                .map(checklist -> {
                    checklist.setChecklist_name(newChecklist.getChecklist_name());
                    return checklistRepository.save(checklist);
                });
    }

    @Transactional
    @DeleteMapping("/checklist/q")
    @CrossOrigin(origins = "*")
    public void deleteChecklist(@RequestParam String checklistNumber) {
        checklistRepository.deleteChecklistByChecklistNumber(checklistNumber);
    }
}
