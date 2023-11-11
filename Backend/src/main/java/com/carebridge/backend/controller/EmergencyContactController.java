package com.carebridge.backend.controller;
import com.carebridge.backend.entity.Elderly;
import com.carebridge.backend.repo.EmergencyContactRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
public class EmergencyContactController {
private final EmergencyContactRepository emergencyContactRepository;
    public EmergencyContactController(EmergencyContactRepository emergencyContactRepository){this.emergencyContactRepository=emergencyContactRepository;}
    @PostMapping( "/emergencyContact/q")
    public Elderly addContact(@RequestBody Elderly elderly){
       return emergencyContactRepository.save(elderly);
    }
    @GetMapping("/emergencyContact")
    List<Elderly> allContact(){return emergencyContactRepository.findAll();}
    @GetMapping("/emergencyContact/guardian")
    List<Elderly> findContactByGuardianId(@RequestParam int guardianId){return emergencyContactRepository.findElderlyByGuardianId(guardianId);}
    @PutMapping( "/emergencyContact/q")
    Optional<Elderly> editContact(@RequestBody Elderly newElderly,@RequestParam int guardianId,@RequestParam int elderlyId) {
        return emergencyContactRepository.findElderlyByGuardianIdAndElderlyId(guardianId, elderlyId)
                .map(elderly->{
                    elderly.setElderlyId(newElderly.getElderlyId());
                    elderly.setGuardianId((newElderly.getGuardianId()));
                    elderly.setHobbies(newElderly.getHobbies());
                    elderly.setEmergencyContact(newElderly.getEmergencyContact());
                    return emergencyContactRepository.save(elderly);
                });
    }
}
