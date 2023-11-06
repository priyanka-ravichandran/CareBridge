package com.carebridge.backend.controller;

import com.carebridge.backend.entity.MedicineReminder;
import com.carebridge.backend.repo.MedicineReminderRepository;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/medicineReminder/{elderlyId}/{day}")
    @CrossOrigin(origins = "*")
    List<MedicineReminder> getRemindersForElderly(@PathVariable int elderlyId, @PathVariable String day) {
        return medicineReminderRepository.getMedicineReminderByElderlyIdAndDay(elderlyId, day);
    }

    @PutMapping("/medicineReminder/q")
    @CrossOrigin(origins = "*")
    Optional<MedicineReminder> updateChecklistItem(@RequestBody MedicineReminder newMedicineReminder,
                                                @RequestParam int elderlyId, @RequestParam int volunteerId,
                                                @RequestParam String medicineName, @RequestParam String day,
                                                   @RequestParam String time) {
        return medicineReminderRepository.getMedicineReminderByElderlyIdAndVolunteerIdAndMedicineNameAndDayAndTime(elderlyId, volunteerId, medicineName, day, time)
                .map(medicineReminder -> {
                    medicineReminder.setMedicineName(newMedicineReminder.getMedicineName());
                    medicineReminder.setDay(newMedicineReminder.getDay());
                    medicineReminder.setTime(newMedicineReminder.getTime());
                    return medicineReminderRepository.save(medicineReminder);
                });
    }

    @DeleteMapping("/medicineReminder/{elderlyId}/q?")
    @CrossOrigin(origins = "*")
    void deleteReminder(@PathVariable("elderlyId") int elderlyId, @RequestParam String medicineName, @RequestParam String day) {
        medicineReminderRepository.deleteMedicineRemindersByElderlyIdAndMedicineNameAndDay(elderlyId, medicineName, day);
    }

}
