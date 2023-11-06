package com.carebridge.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

import java.io.Serializable;

@Entity
@Table(name = "ChecklistItem")
@IdClass(ChecklistItem.class)
public class ChecklistItem implements Serializable {
    @Id
    private long checklistNumber;
    private String itemName;
    private int amount;
    private int status;

    public ChecklistItem() {}

    public ChecklistItem(long checklistNumber, String itemName, int amount, int status) {
        this.checklistNumber = checklistNumber;
        this.itemName = itemName;
        this.amount = amount;
        this.status = status;
    }

    public long getChecklistNumber() {
        return checklistNumber;
    }

    public void setChecklistNumber(int checklistNumber) {
        this.checklistNumber = checklistNumber;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public int getAmount() {
        return amount;
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
