package com.carebridge.backend.entity;
import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table
public class SOSAlerts {
    @Id
    @SequenceGenerator(
            name="SOSAlerts_sequence",
            sequenceName = "SOSAlerts_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "SOSAlerts_sequence"
    )
    private String ElderlyID;
    private String VolunteerID;
    private LocalDateTime Time;
    private String Reason;

    public String getElderlyID() {
        return ElderlyID;
    }

    public void setElderlyID(String elderlyID) {
        ElderlyID = elderlyID;
    }

    public String getVolunteerID() {
        return VolunteerID;
    }

    public void setVolunteerID(String volunteerID) {
        VolunteerID = volunteerID;
    }

    public LocalDateTime getTime() {
        return Time;
    }

    public void setTime(LocalDateTime time) {
        Time = time;
    }

    public String getReason() {
        return Reason;
    }

    public void setReason(String reason) {
        Reason = reason;
    }
}
