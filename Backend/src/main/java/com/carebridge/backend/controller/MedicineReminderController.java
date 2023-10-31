package com.carebridge.backend.controller;

import com.carebridge.backend.entity.MedicineReminder;
import com.carebridge.backend.repo.MedicineReminderRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MedicineReminderController {
    private final MedicineReminderRepository medicineReminderRepository;

    public MedicineReminderController(MedicineReminderRepository medicineReminderRepository) {
        this.medicineReminderRepository = medicineReminderRepository;
    }

    @PostMapping("/medicineReminder")
    @CrossOrigin(origins = "*")
    MedicineReminder medicineReminder(@RequestBody MedicineReminder medicineReminder) {
        return medicineReminderRepository.save(medicineReminder);
    }

    @GetMapping("/medicineReminder")
    @CrossOrigin(origins = "*")
    List<MedicineReminder> all() {
        return medicineReminderRepository.findAll();
    }

    @GetMapping("/medicineReminder/q")
    @CrossOrigin(origins = "*")
    List<MedicineReminder> getRemindersForElderly(@RequestParam int elderlyId) {
        return medicineReminderRepository.getMedicineReminderByElderlyId(elderlyId);
    }

    @DeleteMapping("/medicineReminder/{elderlyId}")
    @CrossOrigin(origins = "*")
    void deleteReminder(@PathVariable("elderlyId") int elderlyId) {
        medicineReminderRepository.deleteMedicineRemindersByElderlyId(elderlyId);
    }

}
