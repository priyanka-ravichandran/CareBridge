package com.carebridge.backend.entity;

import java.util.List;

public class AppointmentList {
    private String userID;
    private List<Appointment> appointmentList;
    public AppointmentList(String userID, List<Appointment> appointmentList){
        this.userID=userID;
        this.appointmentList=appointmentList;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public List<Appointment> getAppointmentList() {
        return appointmentList;
    }

    public void setAppointmentList(List<Appointment> appointmentList) {
        this.appointmentList = appointmentList;
    }

}
