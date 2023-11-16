package com.carebridge.backend.repo;

import com.carebridge.backend.entity.FallReminder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface FallDetectionRepository extends JpaRepository<FallReminder,Long> {
    List<FallReminder>  findFallReminderByElderlyId(int elderlyId);
    List<FallReminder> findFallReminderByGuardianId(int guardianId);
}
