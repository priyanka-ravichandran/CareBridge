package com.carebridge.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name="FallReminder")
@IdClass(FallReminder.class)
public class FallReminder implements Serializable {
    @Id
    private int guardianId;
    @Id
    private String reminderMessage;
    @Id
    private int elderlyId;
    public FallReminder(){}
    public FallReminder(int guardianId,String reminderMessage, int elderlyId){
        this.guardianId=guardianId;
        this.reminderMessage=reminderMessage;
        this.elderlyId=elderlyId;
    }

    public int getGuardianId() {
        return guardianId;
    }

    public void setGuardianId(int guardianId) {
        this.guardianId = guardianId;
    }

    public void setReminderMessage(String reminderMessage) {
        this.reminderMessage = reminderMessage;
    }

    public int getElderlyId() {
        return elderlyId;
    }

    public void setElderlyId(int elderlyId) {
        this.elderlyId = elderlyId;
    }

    public String getReminderMessage() {
        return reminderMessage;
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.guardianId, this.reminderMessage, this.elderlyId);
    }

    @Override
    public String toString() {
        return "FallReminder{" + "ReceiverId=" + this.guardianId + ", reminderMessage='" + this.reminderMessage +
                ", senderId=" + this.elderlyId + "}";
    }

}
