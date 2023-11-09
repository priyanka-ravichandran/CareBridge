package com.carebridge.backend.controller;

import com.carebridge.backend.entity.MedicineReminder;
import com.carebridge.backend.entity.MedicineReminderList;
import com.carebridge.backend.service.MedicineReminderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/v1/medicineReminder")
public class MedicineReminderController {
private MedicineReminderService medicineReminderService;
private MedicineReminderList medList;
@Autowired
public MedicineReminderController(MedicineReminderService medicineReminderService){
    this.medicineReminderService=medicineReminderService;
}
@RequestMapping(value = "/seeMedReminders",method = RequestMethod.POST)
    public ResponseEntity<String> showReminder(@RequestParam String UserID){
    medList=medicineReminderService.fetchList(UserID);
    System.out.println("showing medicine reminder");
    return ResponseEntity.ok("showing medicine reminders");
}
@RequestMapping(value="/addMedReminders",method = RequestMethod.GET)
    public  ResponseEntity<String> addReminder(@RequestBody MedicineReminder medicineReminder){
    boolean res=true;
    res=medicineReminderService.addMedicineReminder(medicineReminder);
    if(res==true)
    {
        System.out.println("added successful");
        return ResponseEntity.ok("added successful");
    }
    return ResponseEntity.ok("error adding");
}
    @RequestMapping(value="/editMedReminders",method = RequestMethod.GET)
    public  ResponseEntity<String> editReminder(@RequestBody MedicineReminder medicineReminder){
        boolean res=true;
        res=medicineReminderService.editMedicineReminder(medicineReminder);
        if(res==true)
        {
            System.out.println("edit successful");
            return ResponseEntity.ok("edit successful");
        }
        return ResponseEntity.ok("error editing");
    }
    @RequestMapping(value = "/addFamily",method = RequestMethod.GET)
    public ResponseEntity<String> addFamily(@RequestParam String UserID,@RequestParam String familyID){
        boolean res=true;
        res=medicineReminderService.addFamily(UserID,familyID);
        if(res==true)
        {
            System.out.println("add successful");
            return ResponseEntity.ok("add successful");
        }
        return ResponseEntity.ok("error adding");

    }
    @RequestMapping(value = "/todayMeds",method = RequestMethod.GET)
    public ResponseEntity<String> fetchTodayMeds(@RequestParam String UserID){
        medList=medicineReminderService.fetchMedReminderOfToday(UserID);
        return ResponseEntity.ok("Today's medicine reminders fetched");
    }
}
