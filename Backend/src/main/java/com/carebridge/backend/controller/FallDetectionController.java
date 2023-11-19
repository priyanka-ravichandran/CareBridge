package com.carebridge.backend.controller;
import com.carebridge.backend.entity.FallReminder;
import com.carebridge.backend.repo.FallDetectionRepository;
import com.carebridge.backend.service.EmailService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FallDetectionController {
    private final FallDetectionRepository fallDetectionRepository;
    private final EmailService emailService;
    public FallDetectionController(FallDetectionRepository fallDetectionRepository, EmailService emailService){
        this.fallDetectionRepository=fallDetectionRepository;
        this.emailService = emailService;
    }
    @PostMapping("/raiseAlert")
    FallReminder addFallReminder(@RequestBody FallReminder fallReminder){
        return fallDetectionRepository.save(fallReminder);
    }
    @GetMapping("/raiseAlert")
    List<FallReminder> all(){return fallDetectionRepository.findAll();}

    @PostMapping("/raiseAlert/q")
    List<FallReminder> raiseAlert(@RequestParam int elderlyID,@RequestParam String userEmail) {
        // Schedule a reminder to be sent after 10 seconds
        emailService.sendEmail(userEmail,"Alert","There is an alert");
        return fallDetectionRepository.findFallReminderByElderlyId(elderlyID);
    }

    @GetMapping("/showAlertToGuardian/q")
    List<FallReminder> showAlertToGuardian(@RequestParam int guardianId) {

        return fallDetectionRepository.findFallReminderByGuardianId(guardianId);
    }
    @GetMapping("/responseToAlert/q")
    void DeleteAlert(@RequestParam int elderlyId,@RequestParam String userEmail) {
        emailService.sendEmail(userEmail,"Drop","Alert dropped");
         fallDetectionRepository.deleteFallReminderByElderlyId(elderlyId);
    }





}

