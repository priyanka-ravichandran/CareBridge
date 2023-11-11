package com.carebridge.backend.controller;


import com.carebridge.backend.entity.Appointment;
import com.carebridge.backend.repo.AppointmentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class AppointmentController {
private final AppointmentRepository appointmentRepository;
public  AppointmentController(AppointmentRepository appointmentRepository){
    this.appointmentRepository=appointmentRepository;
}
@GetMapping( "/Appointment")
    List<Appointment> all(){
    return appointmentRepository.findAll();
}
@GetMapping("/Appointment/elderly")
    List<Appointment> seeAppointmentElderly(@RequestParam int elderlyID){
    return appointmentRepository.findAppointmentByElderlyId(elderlyID);
}
@GetMapping("/Appointment/family")
List<Appointment> seeAppointmentFamily(@RequestParam int familyMemberId){
    return appointmentRepository.findAppointmentByFamilyMemberId(familyMemberId);
}
@PostMapping("/Appointment")
    Appointment addAppointment(@RequestParam Appointment appointment){
    return appointmentRepository.save(appointment);

}
    @PutMapping("/Appointment")
    Optional<Appointment> editAppointment(@RequestParam Appointment newAppointment,@RequestParam int familyMemberId
    ,@RequestParam int elderlyId){
        return appointmentRepository.findAppointmentByFamilyMemberIdAndElderlyId(familyMemberId,elderlyId)
                .map(
                        appointment -> {
                            appointment.setElderlyId(newAppointment.getElderlyId());
                            appointment.setFamilyMemberId(newAppointment.getFamilyMemberId());
                            appointment.setAddress(newAppointment.getAddress());
                            appointment.setTime(newAppointment.getTime());
                            appointment.setRecurring(newAppointment.isRecurring());
                            appointment.setBufferTime(newAppointment.getBufferTime());
                            return appointmentRepository.save(appointment);
                        }
                );

    }
}
