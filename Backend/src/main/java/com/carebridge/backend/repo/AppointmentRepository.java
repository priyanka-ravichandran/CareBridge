package com.carebridge.backend.repo;

import com.carebridge.backend.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface AppointmentRepository extends JpaRepository<Appointment,Long> {
    List<Appointment> findAppointmentsByFamilyId(int familyId);
    List<Appointment> findAppointmentsByVolunteerId(int volunteerId);
    List<Appointment> findAppointmentsBySeniorCitizenId(int seniorCitizenId);
    List<Appointment> findAppointmentsByVolunteerIdAndFamilyId(int volunteerId, int familyId);
    List<Appointment> findAppointmentsByVolunteerIdAndBookingDate(int volunteerId, LocalDateTime bookingDate);
    Optional<Appointment> findAppointmentsByVolunteerIdAndFamilyIdAndBookingDate(int volunteerId, int familyId, LocalDateTime bookingDate);
    Optional<Appointment> findAppointmentById(String id);
    void deleteAppointmentByVolunteerIdAndFamilyIdAndBookingDate(int volunteerId, int familyId, LocalDateTime bookingDate);
}
