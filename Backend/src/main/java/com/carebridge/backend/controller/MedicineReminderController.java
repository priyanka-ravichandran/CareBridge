package com.carebridge.backend.controller;

import com.carebridge.backend.entity.MedicineReminder;
import com.carebridge.backend.entity.MedicineReminderList;
import com.carebridge.backend.repo.MedicineReminderRepository;
import com.carebridge.backend.service.MedicineReminderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class MedicineReminderController {
private final MedicineReminderRepository medicineReminderRepository;

public MedicineReminderController(MedicineReminderRepository medicineReminderRepository){
    this.medicineReminderRepository=medicineReminderRepository;
}
   @GetMapping( "/medicineReminder")
   List<MedicineReminder> showReminder(){
    return medicineReminderRepository.findAll();
}
   @GetMapping("/medicineReminder/byFamily")
   List<MedicineReminder> showReminderByFamily(@RequestParam int familyMemberId){
    return medicineReminderRepository.findMedicineReminderByFamilyMemberId(familyMemberId);
}
@PostMapping("/medicineReminder")
    MedicineReminder addReminder(@RequestBody MedicineReminder medicineReminder){
    return medicineReminderRepository.save(medicineReminder);
}
    @PutMapping("/medicineReminder")
    Optional<MedicineReminder> editReminder(@RequestBody MedicineReminder newMedicineReminder,
                          @RequestParam int elderlyId, @RequestParam int familyMemberId){

       return medicineReminderRepository.findMedicineReminderByFamilyMemberIdAndElderlyId(familyMemberId,elderlyId)
               .map(
                       medicineReminder -> {
                           medicineReminder.setElderlyId(newMedicineReminder.getElderlyId());
                           medicineReminder.setFamilyMemberId(newMedicineReminder.getFamilyMemberId());
                           medicineReminder.setMedicineName(newMedicineReminder.getMedicineName());
                           medicineReminder.setTime(newMedicineReminder.getTime());
                           medicineReminder.setRecurring(newMedicineReminder.isRecurring());
                           return medicineReminder;

                       }
               );
    }

    @GetMapping( "/medicineReminder/today")
    List<MedicineReminder> fetchTodayMeds(@RequestParam int familyMemberId,@RequestParam LocalDateTime time){
        return medicineReminderRepository.findMedicineReminderByFamilyMemberIdAndTime(familyMemberId,time);
    }
}
