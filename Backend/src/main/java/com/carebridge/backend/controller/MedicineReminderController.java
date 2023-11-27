package com.carebridge.backend.controller;

import com.carebridge.backend.entity.MedicineReminder;
import com.carebridge.backend.repo.MedicineReminderRepository;
import com.carebridge.backend.service.EmailService;
import jakarta.transaction.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class MedicineReminderController {
    private final MedicineReminderRepository medicineReminderRepository;
    private final EmailService emailService;

    public MedicineReminderController(MedicineReminderRepository medicineReminderRepository, EmailService emailService) {
        this.medicineReminderRepository = medicineReminderRepository;
        this.emailService = emailService;
    }

    @PostMapping("/medicineReminder")
    @CrossOrigin(origins = "*")
    MedicineReminder medicineReminder(@RequestBody MedicineReminder medicineReminder) {
        // emailService.sendEmail(userEmail,"Add","Adding medicine reminder successful");
        return medicineReminderRepository.save(medicineReminder);
    }

    @GetMapping("/medicineReminder")
    @CrossOrigin(origins = "*")
    List<MedicineReminder> all() {
        return medicineReminderRepository.findAll();
    }

    @GetMapping("/medicineReminder/{elderlyId}")
    @CrossOrigin(origins = "*")
    List<MedicineReminder> getRemindersForElderly(@PathVariable int elderlyId) {
        return medicineReminderRepository.getMedicineReminderByElderlyId(elderlyId);
    }

    @GetMapping("/medicineReminder/{elderlyId}/{day}")
    @CrossOrigin(origins = "*")
    List<MedicineReminder> getRemindersForElderly(@PathVariable int elderlyId, @PathVariable String day) {
        return medicineReminderRepository.getMedicineReminderByElderlyIdAndDay(elderlyId, day);
    }

    @PutMapping("/medicineReminder/q")
    @CrossOrigin(origins = "*")
    Optional<MedicineReminder> updateChecklistItem(@RequestBody MedicineReminder newMedicineReminder,
                                                @RequestParam int elderlyId, @RequestParam int volunteerId,
                                                @RequestParam String medicineReminderNumber) {
        // emailService.sendEmail(userEmail,"Update","Updating medicine reminder successful");
        return medicineReminderRepository.getMedicineReminderByElderlyIdAndVolunteerIdAndMedicineReminderNumber(elderlyId, volunteerId, medicineReminderNumber)
                .map(medicineReminder -> {
                    medicineReminder.setMedicineName(newMedicineReminder.getMedicineName());
                    medicineReminder.setDay(newMedicineReminder.getDay());
                    medicineReminder.setTime(newMedicineReminder.getTime());
                    return medicineReminderRepository.save(medicineReminder);
                });
    }

    @Transactional
    @DeleteMapping("/medicineReminder/q")
    @CrossOrigin(origins = "*")
    public void deleteReminder(@RequestParam String medicineReminderNumber) {
        // emailService.sendEmail(userEmail,"Delete","Deleting medicine reminder successful");
        medicineReminderRepository.deleteMedicineReminderByMedicineReminderNumber(medicineReminderNumber);
    }
}
