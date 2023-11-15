package com.carebridge.backend.repo;

import com.carebridge.backend.entity.MedicineReminder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface MedicineReminderRepository extends JpaRepository<MedicineReminder,Long> {
    List<MedicineReminder> findMedicineReminderByFamilyMemberId(int familyMemberId);
    List<MedicineReminder> findMedicineReminderByFamilyMemberIdAndTime(int familyMemberId, LocalDateTime time);
    Optional<MedicineReminder> findMedicineReminderByFamilyMemberIdAndElderlyId(int familyMemberId,int elderlyId);
}
