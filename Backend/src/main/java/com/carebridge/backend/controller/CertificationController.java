package com.carebridge.backend.controller;

import com.carebridge.backend.entity.Certification;
import com.carebridge.backend.repo.CertificationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CertificationController {
    private final CertificationRepository certificationRepository;

    public CertificationController(CertificationRepository certificationRepository) {
        this.certificationRepository = certificationRepository;
    }

    @PostMapping("/certification")
    @CrossOrigin(origins = "*")
    Certification certification(@RequestBody Certification certification) {
        return certificationRepository.save(certification);
    }

    @GetMapping("/certification/q")
    @CrossOrigin(origins = "*")
    List<Certification> certifications(@RequestParam int volunteerId) {
        return certificationRepository.findCertificationByVolunteerID(volunteerId);
    }
}
