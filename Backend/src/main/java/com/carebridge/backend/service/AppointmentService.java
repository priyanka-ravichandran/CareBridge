package com.carebridge.backend.service;

import com.carebridge.backend.entity.Appointment;
import com.carebridge.backend.entity.AppointmentList;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;

@Service
public class AppointmentService {
    @Async
public AppointmentList fetchAppointmentFamily(String userID){
        List<Appointment> appointmentList=new ArrayList<>();
        LocalDateTime appointmentTime = LocalDateTime.of(2023, Month.JANUARY, 15, 10, 30);
        Appointment appointment = new Appointment("123 Main St", appointmentTime, false, "John Doe",15);
        appointmentList.add(appointment);
        LocalDateTime recurringTime = LocalDateTime.of(2023, Month.FEBRUARY, 5, 14, 0);
        Appointment recurringAppointment = new Appointment("456 Elm St", recurringTime, true, "Alice Smith",15);
        appointmentList.add(recurringAppointment);
        LocalDateTime currentDateTime = LocalDateTime.now();
        Appointment currentAppointment = new Appointment("789 Oak St", currentDateTime, false, "Jane Johnson",15);
        appointmentList.add(currentAppointment);
        AppointmentList appointmentList1=new AppointmentList(userID,appointmentList);
        return appointmentList1;
    }
    @Async
    public boolean addAppointment(Appointment appointment){
        boolean isAdded=true;
        //interact with Database
        return isAdded;
    }
    @Async
    public boolean editAppointment(Appointment appointment){
        boolean isEdit=true;
        //interact with database
        return isEdit;
    }
    @Async
    public List<Appointment> fetchAppointmentSenior(String elderlyID){
        List<Appointment> appointmentList=new ArrayList<>();
        LocalDateTime appointmentTime = LocalDateTime.of(2023, Month.JANUARY, 15, 10, 30);
        Appointment appointment = new Appointment("123 Main St", appointmentTime, false, "John Doe",15);
        appointmentList.add(appointment);
        LocalDateTime recurringTime = LocalDateTime.of(2023, Month.FEBRUARY, 5, 14, 0);
        Appointment recurringAppointment = new Appointment("456 Elm St", recurringTime, true, "Alice Smith",15);
        appointmentList.add(recurringAppointment);
        LocalDateTime currentDateTime = LocalDateTime.now();
        Appointment currentAppointment = new Appointment("789 Oak St", currentDateTime, false, "Jane Johnson",15);
        appointmentList.add(currentAppointment);
        return appointmentList;
    }
}
