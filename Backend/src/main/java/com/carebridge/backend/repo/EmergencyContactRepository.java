package com.carebridge.backend.repo;

import com.carebridge.backend.entity.Elderly;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmergencyContactRepository extends JpaRepository<Elderly,Long> {
 List<Elderly> findElderlyByGuardianId(int guardianId);
 Optional<Elderly> findElderlyByGuardianIdAndElderlyId(int guardianId, int elderlyId);
}
