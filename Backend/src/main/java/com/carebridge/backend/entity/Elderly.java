package com.carebridge.backend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.io.Serializable;

@Entity
@Table(name="Elderly")
@IdClass(Elderly.class)
public class Elderly implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    @Column(name = "ElderlyID")
    private int elderlyId;
    @Column( name = "GuardianID")
    private int guardianId;
    @Column( name = "Hobbies")
    private String hobbies;
    @Column( name = "EmergencyContactName")
    private String emergencyContactName;
    @Column( name = "EmergencyContactPhn")
    private String emergencyContactPhone;

    public Elderly(int elderlyId, int guardianId, String hobbies, String emergencyContactName, String emergencyContactPhone) {
        this.elderlyId = elderlyId;
        this.guardianId = guardianId;
        this.hobbies = hobbies;
        this.emergencyContactName = emergencyContactName;
        this.emergencyContactPhone = emergencyContactPhone;
    }

    public Elderly() {

    }

    public int getElderlyId() {
        return elderlyId;
    }

    public int getGuardianId() {
        return guardianId;
    }

    public String getHobbies() {
        return hobbies;
    }

    public String getEmergencyContactName() {
        return emergencyContactName;
    }

    public void setEmergencyContactName(String emergencyContactName) {
        this.emergencyContactName = emergencyContactName;
    }

    public String getEmergencyContactPhone() {
        return emergencyContactPhone;
    }

    public void setEmergencyContactPhone(String emergencyContactPhone) {
        this.emergencyContactPhone = emergencyContactPhone;
    }

    public void setElderlyId(int elderlyId) {
        this.elderlyId = elderlyId;
    }

    public void setGuardianId(int guardianId) {
        this.guardianId = guardianId;
    }

    public void setHobbies(String hobbies) {
        this.hobbies = hobbies;
    }


}
