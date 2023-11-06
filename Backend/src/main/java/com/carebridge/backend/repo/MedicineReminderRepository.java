package com.carebridge.backend.repo;

import com.carebridge.backend.entity.MedicineReminder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

public interface MedicineReminderRepository extends JpaRepository<MedicineReminder, Long> {
    List<MedicineReminder> getMedicineReminderByElderlyId(int elderlyId);
    List<MedicineReminder> getMedicineReminderByElderlyIdAndDate(int elderlyId, Date date);
    Optional<MedicineReminder> getMedicineReminderByElderlyIdAndVolunteerIdAndMedicineNameAndDateAndTime(int elderlyId, int volunteerId, String medicineName, Date date, String time);
    void deleteMedicineRemindersByElderlyIdAndMedicineNameAndDate(int elderlyId, String medicineName, Date date);
}
