package com.carebridge.backend.controller;

import com.carebridge.backend.entity.SOSAlerts;
import com.carebridge.backend.repo.SOSAlertsRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SOSAlertsController {
    private final SOSAlertsRepository sosAlertsRepository;

    public SOSAlertsController(SOSAlertsRepository sosAlertsRepository) {
        this.sosAlertsRepository = sosAlertsRepository;
    }

    @PostMapping("/sosAlerts")
    @CrossOrigin(origins = "*")
    SOSAlerts sosAlerts(@RequestBody SOSAlerts sosAlerts) {
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
