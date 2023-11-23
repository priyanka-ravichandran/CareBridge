package com.carebridge.backend.controller;


import com.carebridge.backend.entity.Appointment;
import com.carebridge.backend.repo.AppointmentRepository;
import com.carebridge.backend.service.EmailService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
public class AppointmentController {
    private final AppointmentRepository appointmentRepository;
private final EmailService emailService;
    public  AppointmentController(AppointmentRepository appointmentRepository, EmailService emailService){
        this.appointmentRepository = appointmentRepository;
    this.emailService = emailService;
    }

    @GetMapping( "/appointment")
    @CrossOrigin(origins = "*")
    List<Appointment> all(){
        return appointmentRepository.findAll();
    }

    @GetMapping("/appointment/q")
    @CrossOrigin(origins = "*")
    List<Appointment> seeAppointmentForVolunteerAndFamily(@RequestParam(required = false) Integer volunteerId,
                                                          @RequestParam(required = false) Integer familyId) {
        if (familyId == null & volunteerId != null) {
            return appointmentRepository.findAppointmentsByVolunteerId(volunteerId);
        } else if (familyId != null & volunteerId == null) {
            return appointmentRepository.findAppointmentsByFamilyId(familyId);
        } else {
            return appointmentRepository.findAppointmentsByVolunteerIdAndFamilyId(volunteerId, familyId);
        }
    }

    @GetMapping("/appointment/{volunteerId}/q")
    @CrossOrigin(origins = "*")
    List<Appointment> checkAppointmentForVolunteerAndDate(@PathVariable Integer volunteerId,
                                                          @RequestParam LocalDateTime date) {
        return appointmentRepository.findAppointmentsByVolunteerIdAndBookingDate(volunteerId, date);
    }

    @PostMapping("/appointment")
    @CrossOrigin(origins = "*")
    Appointment addAppointment(@RequestBody Appointment appointment) {
        long unixTime = System.currentTimeMillis() / 1000L;
        appointment.setId(String.valueOf(appointment.getVolunteerId()).concat(String.valueOf(unixTime)));
        return appointmentRepository.save(appointment);
    }

    @DeleteMapping("/appointment/q")
    @CrossOrigin(origins = "*")
    void deleteAppointment(@RequestParam int volunteerId, @RequestParam int familyId, @RequestParam LocalDateTime bookingDate) {
        appointmentRepository.deleteAppointmentByVolunteerIdAndFamilyIdAndBookingDate(volunteerId, familyId, bookingDate);
    }

    @PutMapping("/appointment/q")
    @CrossOrigin(origins = "*")
    Optional<Appointment> editAppointment(@RequestBody Appointment newAppointment, @RequestParam String id) {
        return appointmentRepository.findAppointmentById(id)
                .map(appointment -> {
                    appointment.setFamilyId(newAppointment.getFamilyId());
                    appointment.setBookingDate(newAppointment.getBookingDate());
                    appointment.setTimeLengthOfMeeting(newAppointment.getTimeLengthOfMeeting());
                    appointment.setAvailability(newAppointment.getAvailability());
                    appointment.setDescription(newAppointment.getDescription());
                    return appointmentRepository.save(appointment);
                });
    }
}
