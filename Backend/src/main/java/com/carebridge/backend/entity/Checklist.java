package com.carebridge.backend.entity;

public class Checklist {
    private int guardianID;
    private int elderlyID;
    private int checklistNum;
    private String itemName;
    private int amount;

    public Checklist(int guardianID, int elderlyID, int checklistNum, String itemName, int amount) {
        this.guardianID = guardianID;
        this.elderlyID = elderlyID;
        this.checklistNum = checklistNum;
        this.itemName = itemName;
        this.amount = amount;
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
}
