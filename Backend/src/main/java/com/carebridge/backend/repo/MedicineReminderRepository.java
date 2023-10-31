package com.carebridge.backend.repo;

import com.carebridge.backend.entity.MedicineReminder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicineReminderRepository extends JpaRepository<MedicineReminder, Long> {
    List<MedicineReminder> getMedicineReminderByElderlyId(int elderlyId);
    void deleteMedicineRemindersByElderlyId(int elderlyId);
}
