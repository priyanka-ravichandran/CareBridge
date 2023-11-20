package com.carebridge.backend.controller;

import com.carebridge.backend.entity.SOSAlerts;
import com.carebridge.backend.repo.SOSAlertsRepository;
import com.carebridge.backend.service.EmailService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SOSAlertsController {
    private final SOSAlertsRepository sosAlertsRepository;
    private final EmailService emailService;

    public SOSAlertsController(SOSAlertsRepository sosAlertsRepository, EmailService emailService) {
        this.sosAlertsRepository = sosAlertsRepository;
        this.emailService = emailService;
    }

    @PostMapping("/sosAlerts")
    @CrossOrigin(origins = "*")
    SOSAlerts sosAlerts(@RequestBody SOSAlerts sosAlerts,@RequestParam String userEmail) {
        emailService.sendEmail(userEmail,"Add","Adding sosAlerts successful");
        return sosAlertsRepository.save(sosAlerts);
    }

    @GetMapping("/sosAlerts")
    @CrossOrigin(origins = "*")
    List<SOSAlerts> all() {
        return sosAlertsRepository.findAll();
    }

    @GetMapping("/sosAlerts/q")
    @CrossOrigin(origins = "*")
    List<SOSAlerts> forElderlyAndVolunteer(@RequestParam int elderlyId, @RequestParam int volunteerId) {
        return sosAlertsRepository.findSOSAlertsByElderlyIDAndVolunteerID(elderlyId, volunteerId);
    }
}
