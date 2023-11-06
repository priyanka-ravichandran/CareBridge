package com.carebridge.backend.entity;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "Checklist")
@IdClass(Checklist.class)
public class Checklist implements Serializable {
    @Id
    private int guardianID;
    @Id
    private int elderlyID;
    @Id
    @Column(name = "ChecklistNumber")
    private long checklistNum;
    @Id
    private String checklistName;


    public Checklist() {}
    public Checklist(int guardianID, int elderlyID, long checklistNum, String checklistName) {
        this.guardianID = guardianID;
        this.elderlyID = elderlyID;
        this.checklistNum = checklistNum;
        this.checklistName = checklistName;
    }

    public int getGuardianID() {
        return guardianID;
    }

    public int getElderlyID() {
        return elderlyID;
    }

    public long getChecklistNum() {
        return checklistNum;
    }

    public String getChecklistName() {
        return checklistName;
    }

    public void setChecklistName(String checklistName) {
        this.checklistName = checklistName;
    }

    public void setGuardianID(int guardianID) {
        this.guardianID = guardianID;
    }

    public void setElderlyID(int elderlyID) {
        this.elderlyID = elderlyID;
    }

    public void setChecklistNum(long checklistNum) {
        this.checklistNum = checklistNum;
    }
}
