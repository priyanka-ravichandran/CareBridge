package com.carebridge.backend.entity;

import com.carebridge.backend.entity.id.ChecklistId;
import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "Checklist")
@IdClass(ChecklistId.class)
public class Checklist implements Serializable {
    @Id
    private int guardianID;
    @Id
    private int elderlyID;
    @Id
    @Column(name = "ChecklistNumber")
    private String checklistNumber;

    private String checklistName;

    public Checklist() {}
    public Checklist(int guardianID, int elderlyID, String checklistNum, String checklistName) {
        this.guardianID = guardianID;
        this.elderlyID = elderlyID;
        this.checklistNumber = checklistNum;
        this.checklistName = checklistName;
    }

    public int getGuardian_id() {
        return guardianID;
    }

    public int getElderly_id() {
        return elderlyID;
    }

    public String getChecklist_number() {
        return checklistNumber;
    }

    public String getChecklist_name() {
        return checklistName;
    }

    public void setChecklist_name(String checklistName) {
        this.checklistName = checklistName;
    }

    public void setGuardian_id(int guardianID) {
        this.guardianID = guardianID;
    }

    public void setElderly_id(int elderlyID) {
        this.elderlyID = elderlyID;
    }

    public void setChecklist_number(String checklistNum) {
        this.checklistNumber = checklistNum;
    }
}
