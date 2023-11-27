package com.carebridge.backend.controller;
import com.carebridge.backend.entity.Elderly;
import com.carebridge.backend.repo.EmergencyContactRepository;
import com.carebridge.backend.service.EmailService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
public class EmergencyContactController {
private final EmergencyContactRepository emergencyContactRepository;
private final EmailService emailService;
    public EmergencyContactController(EmergencyContactRepository emergencyContactRepository, EmailService emailService){this.emergencyContactRepository=emergencyContactRepository;
        this.emailService = emailService;
    }
    @PostMapping( "/emergencyContact/q")
    public Elderly addContact(@RequestBody Elderly elderly,@RequestParam String userEmail){
        emailService.sendEmail(userEmail,"Add","Adding contact successful");
       return emergencyContactRepository.save(elderly);
    }
    @GetMapping("/emergencyContact")
    List<Elderly> allContact(){return emergencyContactRepository.findAll();}
    @GetMapping("/emergencyContact/guardian")
    List<Elderly> findContactByGuardianId(@RequestParam int guardianId){return emergencyContactRepository.findElderlyByGuardianId(guardianId);}
    @PutMapping( "/emergencyContact/q")
    Optional<Elderly> editContact(@RequestBody Elderly newElderly,@RequestParam int guardianId,@RequestParam int elderlyId,@RequestParam String userEmail) {
        emailService.sendEmail(userEmail,"Update","Updating contact successful");
        return emergencyContactRepository.findElderlyByGuardianIdAndElderlyId(guardianId, elderlyId)
                .map(elderly->{
                    elderly.setElderlyId(newElderly.getElderlyId());
                    elderly.setGuardianId((newElderly.getGuardianId()));
                    elderly.setHobbies(newElderly.getHobbies());
                    elderly.setEmergencyContactName(newElderly.getEmergencyContactName());
                    elderly.setEmergencyContactPhone(newElderly.getEmergencyContactPhone());
                    return emergencyContactRepository.save(elderly);
                });
    }
}
