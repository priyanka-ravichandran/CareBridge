package com.carebridge.backend.repo;

import com.carebridge.backend.entity.Certification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CertificationRepository extends JpaRepository<Certification, Long> {
    List<Certification> findCertificationByVolunteerID(int volunteerId);
}
