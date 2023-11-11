package com.carebridge.backend.service;

import com.carebridge.backend.entity.MedicineReminder;
import com.carebridge.backend.entity.MedicineReminderList;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class MedicineReminderService {
    @Async
   public MedicineReminderList fetchList(String UserID){

        return null;
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
    public MedicineReminderList fetchMedReminderOfToday(String UserID){

        return null;
    }
}
