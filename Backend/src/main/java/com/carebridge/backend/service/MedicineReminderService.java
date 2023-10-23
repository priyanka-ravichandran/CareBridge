package com.carebridge.backend.service;

import com.carebridge.backend.entity.MedicineReminder;
import com.carebridge.backend.entity.MedicineReminderList;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class MedicineReminderService {
    @Async
   public MedicineReminderList fetchList(String UserID){
        List<MedicineReminder> reminders = new ArrayList<>();
        reminders.add(new MedicineReminder("Aspirin", LocalDateTime.of(2023,10,20,8, 30), false, "John Doe"));
        reminders.add(new MedicineReminder("Vitamin C", LocalDateTime.of(2023,10,29,9, 0), true, "Jane Smith"));
        reminders.add(new MedicineReminder("Antibiotics", LocalDateTime.of(2023,10,22,12, 15), false, "Alice Johnson"));
        reminders.add(new MedicineReminder("Painkiller", LocalDateTime.of(2023,10,16,16, 0), true, "Bob Brown"));
        MedicineReminderList reminderList = new MedicineReminderList(UserID,reminders);
        return reminderList;
    }
    @Async
    public boolean addMedicineReminder(MedicineReminder newMedReminder){
        boolean isAdded=true;
        //interact with database
        return isAdded;
    }
    @Async
    public  boolean editMedicineReminder(MedicineReminder newMedReminder){
        boolean isEdit=true;
        //interact with database
        return isEdit;
    }
    @Async
    public boolean addFamily(String UserID , String familyID){
        boolean isAdded=true;
        //interact with database
        return isAdded;
    }
    @Async
    public MedicineReminderList fetchMedReminderOfToday(String UserID, String ElderlyID){
        List<MedicineReminder> reminders = new ArrayList<>();
        reminders.add(new MedicineReminder("Antibiotics", LocalDateTime.of(2023,10,22,12, 15), false, "Alice Johnson"));
        MedicineReminderList reminderList = new MedicineReminderList(UserID,reminders);
        return reminderList;
    }
}
