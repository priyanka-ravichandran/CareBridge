package com.carebridge.backend.entity.id;

import java.io.Serializable;

public class ReminderId implements Serializable {
    private int elderlyId;
    private int volunteerId;
    private String reminderNumber;

    public ReminderId(int elderlyId, int volunteerId, String reminderNumber) {
        this.elderlyId = elderlyId;
        this.volunteerId = volunteerId;
        this.reminderNumber = reminderNumber;
    }

    public ReminderId() {}
}
