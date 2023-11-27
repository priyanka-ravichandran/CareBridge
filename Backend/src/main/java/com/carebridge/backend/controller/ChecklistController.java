package com.carebridge.backend.controller;

import com.carebridge.backend.entity.Checklist;
import com.carebridge.backend.repo.ChecklistRepository;
import com.carebridge.backend.service.EmailService;
import jakarta.transaction.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ChecklistController {

    private final ChecklistRepository checklistRepository;
    private final EmailService emailService;

    public ChecklistController(ChecklistRepository checklistRepository, EmailService emailService) {
        this.checklistRepository = checklistRepository;
        this.emailService = emailService;
    }

    @PostMapping("/checklist")
    @CrossOrigin(origins = "*")
    Checklist checklist(@RequestBody Checklist checklist) {
        // emailService.sendEmail(userEmail,"Add","Adding CheckList was successful");
        return checklistRepository.save(checklist);
    }

    @GetMapping("/checklist")
    @CrossOrigin(origins = "*")
    List<Checklist> all() {
        return checklistRepository.findAll();
    }

    @GetMapping("/checklist/{elderlyId}")
    @CrossOrigin(origins = "*")
    List<Checklist> getChecklistForElderly(@PathVariable int elderlyId) {
        return checklistRepository.findChecklistByElderlyID(elderlyId);
    }

    @GetMapping("/checklist/q")
    @CrossOrigin(origins = "*")
    List<Checklist> getChecklistForGuardianAndElderly(@RequestParam int guardianId, @RequestParam int elderlyId) {
        return checklistRepository.findChecklistByGuardianIDAndElderlyID(guardianId, elderlyId);
    }

    @PutMapping("/checklist/q")
    @CrossOrigin(origins = "*")
    Optional<Checklist> updateChecklistForElderlyGuardianAndNumber(@RequestBody Checklist newChecklist
            , @RequestParam int guardianId, @RequestParam int elderlyId, @RequestParam String checklistNumber) {
        // emailService.sendEmail(guardianEmail,"Update","Updating CheckList successful");
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
        // emailService.sendEmail(userEmail,"Delete","Deleting the CheckList successful");
        checklistRepository.deleteChecklistByChecklistNumber(checklistNumber);

    }
}
