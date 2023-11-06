package com.carebridge.backend.entity.id;

import java.io.Serializable;

public class ChecklistId implements Serializable {
    private int guardianID;
    private int elderlyID;
    private String checklistNumber;

    public ChecklistId () {}

    public ChecklistId(int guardianId, int elderlyId, String checklistNumber) {
        this.guardianID = guardianId;
        this.elderlyID = elderlyId;
        this.checklistNumber = checklistNumber;
    }
}
