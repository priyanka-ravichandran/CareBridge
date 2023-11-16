package com.carebridge.backend.entity.id;

import java.io.Serializable;

public class ChecklistItemId implements Serializable {
    private String checklistNumber;
    private String itemName;

    public ChecklistItemId() { }

    public ChecklistItemId(String checklistNumber, String itemName) {
        this.checklistNumber = checklistNumber;
        this.itemName = itemName;
    }
}
