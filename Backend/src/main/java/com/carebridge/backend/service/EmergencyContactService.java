package com.carebridge.backend.service;
import com.carebridge.backend.entity.Elderly;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;
@Service
public class EmergencyContactService {
    public Boolean addEmergencyContact(Elderly elderly){

        //Interact with DB here
        return true;
    }
    public Boolean editEmergencyContact(Elderly elderly){
        //Interact with DB here
        return true;
    }
}
