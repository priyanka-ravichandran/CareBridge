package com.carebridge.backend.controller;

import com.carebridge.backend.entity.MedicineReminder;
import com.carebridge.backend.repo.MedicineReminderRepository;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

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

    @GetMapping("/medicineReminder/{elderlyId}")
    @CrossOrigin(origins = "*")
    List<MedicineReminder> getRemindersForElderly(@PathVariable int elderlyId) {
        return medicineReminderRepository.getMedicineReminderByElderlyId(elderlyId);
    }

    @GetMapping("/medicineReminder/{elderlyId}/{date}")
    @CrossOrigin(origins = "*")
    List<MedicineReminder> getRemindersForElderly(@PathVariable int elderlyId, @PathVariable Date date) {
        return medicineReminderRepository.getMedicineReminderByElderlyIdAndDate(elderlyId, date);
    }

    @PutMapping("/medicineReminder/q")
    @CrossOrigin(origins = "*")
    Optional<MedicineReminder> updateChecklistItem(@RequestBody MedicineReminder newMedicineReminder,
                                                @RequestParam int elderlyId, @RequestParam int volunteerId,
                                                @RequestParam String medicineName, @RequestParam Date date,
                                                   @RequestParam String time) {
        return medicineReminderRepository.getMedicineReminderByElderlyIdAndVolunteerIdAndMedicineNameAndDateAndTime(elderlyId, volunteerId, medicineName, date, time)
                .map(medicineReminder -> {
                    medicineReminder.setMedicineName(newMedicineReminder.getMedicineName());
                    medicineReminder.setDate(newMedicineReminder.getDate());
                    medicineReminder.setTime(newMedicineReminder.getTime());
                    return medicineReminderRepository.save(medicineReminder);
                });
    }

    @DeleteMapping("/medicineReminder/{elderlyId}/q?")
    @CrossOrigin(origins = "*")
    void deleteReminder(@PathVariable("elderlyId") int elderlyId, @RequestParam String medicineName, @RequestParam Date date) {
        medicineReminderRepository.deleteMedicineRemindersByElderlyIdAndMedicineNameAndDate(elderlyId, medicineName, date);
    }

}
