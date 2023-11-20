package com.carebridge.backend.repo;

import com.carebridge.backend.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AppointmentRepository extends JpaRepository<Appointment,Long> {
    List<Appointment> findAppointmentsByFamilyId(int familyId);
    List<Appointment> findAppointmentsByVolunteerId(int volunteerId);
    List<Appointment> findAppointmentsByVolunteerIdAndFamilyId(int volunteerId, int familyId);
    List<Appointment> findAppointmentsByVolunteerIdAndBookingDate(int volunteerId, String bookingDate);
    Optional<Appointment> findAppointmentsByVolunteerIdAndFamilyIdAndBookingDateAndBookingStartTime(int volunteerId, int familyId, String bookingDate, String bookingStartTime);
    Optional<Appointment> findAppointmentById(String id);
    void deleteAppointmentByVolunteerIdAndFamilyIdAndBookingDateAndBookingStartTime(int volunteerId, int familyId, String bookingDate, String bookingStartTime);
}
