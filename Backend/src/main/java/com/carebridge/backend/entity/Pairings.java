package com.carebridge.backend.entity;

import com.carebridge.backend.entity.id.PairingsId;
import jakarta.persistence.*;

@Entity
@Table(name = "Pairings")
@IdClass(PairingsId.class)
public class Pairings {
    @Id
    @Column(name = "Senior_Citizen_ID")
    private int seniorCitizenId;
    @Id
    @Column(name = "Family_ID")
    private int familyId;

    public Pairings() {}

    public Pairings(int seniorCitizenId, int familyId) {
        this.seniorCitizenId = seniorCitizenId;
        this.familyId = familyId;
    }

    public int getSeniorCitizenId() {
        return seniorCitizenId;
    }

    public void setSeniorCitizenId(int seniorCitizenId) {
        this.seniorCitizenId = seniorCitizenId;
    }

    public int getFamilyId() {
        return familyId;
    }

    public void setFamilyId(int familyId) {
        this.familyId = familyId;
    }
}
