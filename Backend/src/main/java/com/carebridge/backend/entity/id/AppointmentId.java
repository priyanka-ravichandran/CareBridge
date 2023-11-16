package com.carebridge.backend.entity.id;

import java.io.Serializable;

public class AppointmentId implements Serializable {
    private int volunteerId;
    private int familyId;
    private String bookingDate;
    private String bookingStartTime;

    public AppointmentId() {}

    public AppointmentId(int volunteerId, int familyId, String bookingDate, String bookingStartTime) {
        this.volunteerId = volunteerId;
        this.familyId = familyId;
        this.bookingDate = bookingDate;
        this.bookingStartTime = bookingStartTime;
    }
}
