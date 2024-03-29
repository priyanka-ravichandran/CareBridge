package com.carebridge.backend.repo;

import com.carebridge.backend.entity.Checklist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChecklistRepository extends JpaRepository<Checklist, Long> {
    List<Checklist> findChecklistByGuardianIDAndElderlyID(int guardianId, int elderlyId);
    Optional<Checklist> findChecklistByGuardianIDAndElderlyIDAndChecklistNumber(int guardianId, int elderlyId, String checklistNum);
    List<Checklist> findChecklistByElderlyID(int elderlyId);
    void deleteChecklistByChecklistNumber(String checklistNumber);
}