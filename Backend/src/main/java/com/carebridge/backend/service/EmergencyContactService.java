package com.carebridge.backend.service;
import com.carebridge.backend.entity.Elderly;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;
@Service
public class EmergencyContactService {
    public Boolean addEmergencyContact(Elderly elderly){
        Elderly newElderly=new Elderly();
        newElderly.setElderlyID(elderly.getElderlyID());
        newElderly.setGuardianID(elderly.getGuardianID());
        newElderly.setHobbies(elderly.getHobbies());
        newElderly.setEmergencyContact(elderly.getEmergencyContact());
        //Interact with DB here
        return true;
    }
    public Boolean editEmergencyContact(Elderly elderly){
        Elderly newElderly=new Elderly();
        newElderly.setElderlyID(elderly.getElderlyID());
        newElderly.setGuardianID(elderly.getGuardianID());
        newElderly.setHobbies(elderly.getHobbies());
        newElderly.setEmergencyContact(elderly.getEmergencyContact());
        //Interact with DB here
        return true;
    }
}
