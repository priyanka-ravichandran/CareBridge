package com.carebridge.backend.entity;

import com.carebridge.backend.entity.id.ChecklistItemId;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

import java.io.Serializable;

@Entity
@Table(name = "ChecklistItem")
@IdClass(ChecklistItemId.class)
public class ChecklistItem implements Serializable {
    @Id
    private String checklistNumber;
    @Id
    private String itemName;
    private int amount;
    private int status;

    public ChecklistItem() {}

    public ChecklistItem(String checklistNumber, String itemName, int amount, int status) {
        this.checklistNumber = checklistNumber;
        this.itemName = itemName;
        this.amount = amount;
        this.status = status;
    }

    public String getChecklistNumber() {
        return checklistNumber;
    }

    public void setChecklistNumber(String checklistNumber) {
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
