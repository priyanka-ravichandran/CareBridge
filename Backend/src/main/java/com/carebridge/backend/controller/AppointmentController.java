package com.carebridge.backend.controller;


import com.carebridge.backend.entity.Appointment;
import com.carebridge.backend.entity.AppointmentList;
import com.carebridge.backend.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/appointment")
public class AppointmentController {
private AppointmentService appointmentService;
private AppointmentList appointmentList;
@Autowired
public  AppointmentController(AppointmentService appointmentService){
    this.appointmentService=appointmentService;
}
@RequestMapping(value = "/seeAppointmentFamily" ,method = RequestMethod.GET)
    public ResponseEntity<String> seeAppointmentFamily(@RequestParam String userID){
    appointmentList=appointmentService.fetchAppointmentFamily(userID);
    System.out.println("Showing the appointment");
    return ResponseEntity.ok("Showing the appointment");
}
@RequestMapping(value = "/seeAppointmentElderly", method = RequestMethod.GET)
    public ResponseEntity<String> seeAppointmentElderly(@RequestParam String elderlyID){
    List<Appointment> appointmentList1=appointmentService.fetchAppointmentSenior(elderlyID);
    System.out.println("Showing the appointment");
    return ResponseEntity.ok("Showing the appointment");
}
@RequestMapping(value = "/addAppointment", method = RequestMethod.GET)
    public ResponseEntity<String> addAppointment(@RequestParam Appointment appointment){
    boolean res=true;
    res=appointmentService.addAppointment(appointment);
    if(res==true)
    {
        System.out.println("added successful");
        return ResponseEntity.ok("added successful");
    }
    return ResponseEntity.ok("error adding");

}
    @RequestMapping(value = "/editAppointment", method = RequestMethod.GET)
    public ResponseEntity<String> editAppointment(@RequestParam Appointment appointment){
        boolean res=true;
        res=appointmentService.editAppointment(appointment);
        if(res==true)
        {
            System.out.println("edited successful");
            return ResponseEntity.ok("edited successful");
        }
        return ResponseEntity.ok("error editing");

    }
}
