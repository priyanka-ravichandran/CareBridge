package com.carebridge.backend.entity;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name="FallReminder")
@IdClass(FallReminder.class)
public class FallReminder implements Serializable {
    @Id
    @Column(name = "RECEIVERID")
    private int guardianId;
    @Column(name = "REMINDERMESSAGE")
    private String reminderMessage;
    @Id
    @Column(name = "SENDERID")
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
