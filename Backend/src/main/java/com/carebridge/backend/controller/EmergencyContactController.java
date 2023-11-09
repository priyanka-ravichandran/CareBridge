package com.carebridge.backend.controller;
import com.carebridge.backend.entity.Elderly;
import com.carebridge.backend.service.EmergencyContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
@RestController
@RequestMapping("api/v1/emergencyContact")
public class EmergencyContactController {
private EmergencyContactService ECS;
    @Autowired
    public EmergencyContactController(EmergencyContactService ECS){this.ECS=ECS;}
    @RequestMapping(value = "/addContact",method = RequestMethod.POST)
    public ResponseEntity<String> addContact(@RequestBody Elderly elderly){
        boolean ifAdded=false;
        ifAdded=ECS.addEmergencyContact(elderly);
        if(ifAdded==false){
            System.out.println("Failed to add Emergency contact");
            return  ResponseEntity.ok("Failed to add new contact");
        }
        else{
            System.out.println("Emergency contact added successfully");
            String guardianID = elderly.getGuardianID();
            String hobbies = elderly.getHobbies();
            String emergencyContact = elderly.getEmergencyContact();
            return ResponseEntity.ok("Successfully added details: guardian id:"+guardianID
                    +"  hobbies:"+hobbies+"  emergency contact:"+emergencyContact);
        }
    }
    @RequestMapping(value = "/editContact",method = RequestMethod.POST)
    public ResponseEntity<String> editContact(@RequestBody Elderly elderly){
        boolean ifAdded=false;
        ifAdded=ECS.editEmergencyContact(elderly);
        if(ifAdded==false){
            System.out.println("Failed to edit Emergency contact");
            return  ResponseEntity.ok("Failed to edit contact");
        }
        else{
            System.out.println("Emergency contact edit successfully");
            String guardianID = elderly.getGuardianID();
            String hobbies = elderly.getHobbies();
            String emergencyContact = elderly.getEmergencyContact();
            return ResponseEntity.ok("Successfully edited");
        }
    }
}
