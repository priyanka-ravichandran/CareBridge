package com.carebridge.backend.service;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
public class ReminderService {
    boolean isStop=false;
    @Async
    public CompletableFuture<Void> scheduleAlert() {
        isStop=false;
        // Start a 10 sec timer for user to respond
        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        if(isStop==true)
            return CompletableFuture.completedFuture(null);
        // If users haven't responded within 10 seconds, send alerts to emergency contacts
        sendEmergencyAlerts();

        return CompletableFuture.completedFuture(null);
    }
    private void sendEmergencyAlerts() {
        //yet to implement
        System.out.println("Alert: Sending emergency alerts to contacts with current location.");
    }

    public void handleUserResponse() {
        //if ("close".equalsIgnoreCase(response)) {
            // User close the reminder
            isStop=true;
            System.out.println("Alert closed by user. No further action needed.");
        //}
    }
}
