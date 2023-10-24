package com.carebridge.backend.controller;
import com.carebridge.backend.service.ReminderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.CompletableFuture;
@RestController
@RequestMapping(path = "api/v1/reminder")
public class ReminderController {
    private ReminderService reminderService;
    @Autowired
    public  ReminderController(ReminderService reminderService){
        this.reminderService=reminderService;
    }
    @RequestMapping(value = "/raiseAlert",method = RequestMethod.GET)
    public ResponseEntity<String> raiseAlert() {
        // Schedule a reminder to be sent after 10 seconds
        reminderService.scheduleAlert();

        return ResponseEntity.ok("Alert raised successfully");
    }

    @RequestMapping(value = "/respondToAlert",method = RequestMethod.GET)
    public ResponseEntity<String> respondToAlert() {
        // Handle user response to the alert
        reminderService.handleUserResponse();

        return ResponseEntity.ok("User response handled");
    }
}
