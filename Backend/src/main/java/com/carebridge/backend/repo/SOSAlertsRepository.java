package com.carebridge.backend.repo;

import com.carebridge.backend.entity.AppUser;
import com.carebridge.backend.entity.SOSAlerts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SOSAlertsRepository extends JpaRepository<SOSAlerts, Long> {
    List<SOSAlerts> findSOSAlertsByElderlyIDAndVolunteerID(int elderlyID, int volunteerId);
}
