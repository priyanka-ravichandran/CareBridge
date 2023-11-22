package com.carebridge.backend.repo;

import com.carebridge.backend.entity.Reminder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReminderRepository extends JpaRepository<Reminder, Long> {
    List<Reminder> getRemindersByElderlyId(int elderlyId);
    List<Reminder> getRemindersByElderlyIdAndDate(int elderlyId, String day);
    Optional<Reminder> getRemindersByElderlyIdAndVolunteerIdAndReminderNumber(int elderlyId, int volunteerId, String reminderNumber);
    void deleteRemindersByReminderNumber(String reminderNumber);
}
