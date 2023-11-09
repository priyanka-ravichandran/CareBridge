package com.carebridge.backend.controller;
import com.carebridge.backend.entity.FallReminder;
import com.carebridge.backend.repo.FallDetectionRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FallDetectionController {
    private final FallDetectionRepository fallDetectionRepository;
    public FallDetectionController(FallDetectionRepository fallDetectionRepository){
        this.fallDetectionRepository=fallDetectionRepository;
    }
    @PostMapping("/raiseAlert")
    FallReminder addFallReminder(@RequestBody FallReminder fallReminder){
        return fallDetectionRepository.save(fallReminder);
    }
    @GetMapping("/raiseAlert")
    List<FallReminder> all(){return fallDetectionRepository.findAll();}

    @PostMapping("/raiseAlert/q")
    List<FallReminder> raiseAlert(@RequestParam int elderlyID) {
        // Schedule a reminder to be sent after 10 seconds
        return fallDetectionRepository.findFallReminderByElderlyId(elderlyID);
    }

    @GetMapping("/respondToAlert/q")
    List<FallReminder> respondToAlert(@RequestParam int guardianId) {
        // Handle user response to the alert
        return fallDetectionRepository.findFallReminderByGuardianId(guardianId);
    }




}

