package com.carebridge.backend.controller;

import com.carebridge.backend.entity.Reminder;
import com.carebridge.backend.repo.ReminderRepository;
import jakarta.transaction.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ReminderController {
    private final ReminderRepository reminderRepository;

    public ReminderController(ReminderRepository reminderRepository) {
        this.reminderRepository = reminderRepository;
    }

    @PostMapping("/reminder")
    @CrossOrigin(origins = "*")
    Reminder reminder(@RequestBody Reminder reminder) {
        return reminderRepository.save(reminder);
    }

    @GetMapping("/reminder")
    @CrossOrigin(origins = "*")
    List<Reminder> all() {
        return reminderRepository.findAll();
    }

    @GetMapping("/reminder/{elderlyId}")
    @CrossOrigin(origins = "*")
    List<Reminder> getRemindersForElderly(@PathVariable int elderlyId) {
        return reminderRepository.getRemindersByElderlyId(elderlyId);
    }

    @GetMapping("/reminder/{elderlyId}/{date}")
    @CrossOrigin(origins = "*")
    List<Reminder> getRemindersForElderly(@PathVariable int elderlyId, @PathVariable String date) {
        return reminderRepository.getRemindersByElderlyIdAndDate(elderlyId, date);
    }

    @PutMapping("/reminder/q")
    @CrossOrigin(origins = "*")
    Optional<Reminder> updateChecklistItem(@RequestBody Reminder newReminder,
                                                   @RequestParam int elderlyId, @RequestParam int volunteerId,
                                                   @RequestParam String reminderNumber) {
        return reminderRepository.getRemindersByElderlyIdAndVolunteerIdAndReminderNumber(elderlyId, volunteerId, reminderNumber)
                .map(reminder -> {
                    reminder.setDescription(newReminder.getDescription());
                    reminder.setDate(newReminder.getDate());
                    reminder.setTime(newReminder.getTime());
                    return reminderRepository.save(reminder);
                });
    }

    @Transactional
    @DeleteMapping("/reminder/q")
    @CrossOrigin(origins = "*")
    public void deleteReminder(@RequestParam String reminderNumber) {
        reminderRepository.deleteRemindersByReminderNumber(reminderNumber);
    }
}
