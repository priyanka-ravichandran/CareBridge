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
    private int checklistNum;
    @Id
    @Column(name = "Item")
    private String itemName;
    private int amount;
    private int status;

    public Checklist() {}
    public Checklist(int guardianID, int elderlyID, int checklistNum, String itemName, int amount, int status) {
        this.guardianID = guardianID;
        this.elderlyID = elderlyID;
        this.checklistNum = checklistNum;
        this.itemName = itemName;
        this.amount = amount;
        this.status = status;
    }

    public int getGuardianID() {
        return guardianID;
    }

    public int getElderlyID() {
        return elderlyID;
    }

    public int getChecklistNum() {
        return checklistNum;
    }

    public String getItemName() {
        return itemName;
    }

    public int getAmount() {
        return amount;
    }

    public void setGuardianID(int guardianID) {
        this.guardianID = guardianID;
    }

    public void setElderlyID(int elderlyID) {
        this.elderlyID = elderlyID;
    }

    public void setChecklistNum(int checklistNum) {
        this.checklistNum = checklistNum;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
