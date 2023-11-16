package com.carebridge.backend.entity.id;

import java.io.Serializable;

public class MedicineReminderId implements Serializable {
    private int elderlyId;
    private int volunteerId;
    private String medicineReminderNumber;

    public MedicineReminderId(int elderlyId, int volunteerId, String medicineReminderNumber) {
        this.elderlyId = elderlyId;
        this.volunteerId = volunteerId;
        this.medicineReminderNumber = medicineReminderNumber;
    }

    public MedicineReminderId() {}
}
