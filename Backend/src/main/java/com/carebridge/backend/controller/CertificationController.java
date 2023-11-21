package com.carebridge.backend.controller;

import com.carebridge.backend.entity.Certification;
import com.carebridge.backend.repo.CertificationRepository;
import com.carebridge.backend.service.EmailService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CertificationController {
    private final CertificationRepository certificationRepository;
    private final EmailService emailService;

    public CertificationController(CertificationRepository certificationRepository, EmailService emailService) {
        this.certificationRepository = certificationRepository;
        this.emailService = emailService;
    }

    @PostMapping("/certification")
    @CrossOrigin(origins = "*")
    Certification certification(@RequestBody Certification certification,@RequestParam String userEmail) {
        emailService.sendEmail(userEmail,"Add","Adding certificate was successful");
        return certificationRepository.save(certification);
    }

    @GetMapping("/certification/q")
    @CrossOrigin(origins = "*")
    List<Certification> certifications(@RequestParam int volunteerId) {
        return certificationRepository.findCertificationByVolunteerID(volunteerId);
    }
}
