package com.carebridge.backend.entity;
import com.carebridge.backend.entity.MedicineReminder;

import java.util.List;

public class MedicineReminderList {
    private String userId;
    private List<MedicineReminder> medicineReminders;

    public MedicineReminderList(String userId, List<MedicineReminder> medicineReminders) {
        this.userId = userId;
        this.medicineReminders = medicineReminders;
    }
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<MedicineReminder> getMedicineReminders() {
        return medicineReminders;
    }

    public void setMedicineReminders(List<MedicineReminder> medicineReminders) {
        this.medicineReminders = medicineReminders;
    }
}
