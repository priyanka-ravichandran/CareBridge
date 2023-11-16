package com.carebridge.backend.repo;

import com.carebridge.backend.entity.Pairings;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PairingsRepository extends JpaRepository<Pairings, Long> {
    List<Pairings> getPairingsBySeniorCitizenId(int seniorCitizenId);
    List<Pairings> getPairingsByFamilyIdAndSeniorCitizenId(int familyId, int seniorCitizenId);
    List<Pairings> getPairingsByFamilyId(int familyId);
}
