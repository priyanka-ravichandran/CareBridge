package com.carebridge.backend.repo;

import com.carebridge.backend.entity.MedicineReminder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MedicineReminderRepository extends JpaRepository<MedicineReminder, Long> {
    List<MedicineReminder> getMedicineReminderByElderlyId(int elderlyId);
    List<MedicineReminder> getMedicineReminderByElderlyIdAndDay(int elderlyId, String day);
    Optional<MedicineReminder> getMedicineReminderByElderlyIdAndVolunteerIdAndMedicineReminderNumber(int elderlyId, int volunteerId, String medicineReminderNumber);
    void deleteMedicineReminderByMedicineReminderNumber(String medicineReminderNumber);
}
