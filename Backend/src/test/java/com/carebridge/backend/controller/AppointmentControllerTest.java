package com.carebridge.backend.controller;

import com.carebridge.backend.entity.Appointment;
import com.carebridge.backend.repo.AppointmentRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AppointmentControllerTest {

    @Mock
    private AppointmentRepository appointmentRepository;

    @InjectMocks
    private AppointmentController appointmentController;

    @Test
    public void testGetAllAppointments() {
        // Mock data
        List<Appointment> appointments = new ArrayList<>();
        // TODO: Add mock appointments to the list

        when(appointmentRepository.findAll()).thenReturn(appointments);

        List<Appointment> result = appointmentController.all();

        assertEquals(appointments.size(), result.size());
    }

    @Test
    public void testAddAppointment() {
        Appointment newAppointment = new Appointment(1001, 1004, 1008, "2023-11-20", "8:00 AM", "8:30 AM", 2, "testDesc");

        when(appointmentRepository.save(any(Appointment.class))).thenReturn(newAppointment);
        Appointment result = appointmentController.addAppointment(newAppointment);

        assertEquals(newAppointment.getDescription(), result.getDescription());
    }

    @Test
    public void testEditAppointment() {
        int volunteerId=1001;
        int familyId=1004;
        int seniorCitizenId=1008;
        Appointment existingAppointment = new Appointment(volunteerId, familyId, seniorCitizenId, "2023-11-20", "8:00 AM", "8:30 AM", 2, "testDesc");
        String id = "1023121";

        Appointment updatedAppointment = new Appointment(volunteerId, familyId, seniorCitizenId, "2023-11-20", "8:30 AM", "8:45 AM", 2, "New Description");

        when(appointmentRepository.findAppointmentById(id))
                .thenReturn(Optional.of(existingAppointment));
        when(appointmentRepository.save(any(Appointment.class))).thenReturn(updatedAppointment);

        Optional<Appointment> result = appointmentController.editAppointment(updatedAppointment, id);

        assertTrue(result.isPresent());
        assertEquals(updatedAppointment.getDescription(), result.get().getDescription());
    }

    @Test
    public void testSeeAppointmentForVolunteerAndFamily() {
        int volunteerId = 1;
        int familyId = 1;
        List<Appointment> appointments = new ArrayList<>();

        when(appointmentRepository.findAppointmentsByFamilyId(familyId)).thenReturn(appointments);

        List<Appointment> result = appointmentController.seeAppointmentForVolunteerAndFamily(volunteerId, familyId);

        assertEquals(appointments.size(), result.size());
    }

    @Test
    public void testEditAppointment_NotFound() {
        String id = "12312312412";
        int volunteerId=1001;
        int familyId=1004;
        int seniorCitizenId=1008;
        Appointment updatedAppointment = new Appointment(volunteerId, familyId, seniorCitizenId, "2023-11-20", "8:00 AM", "8:30 AM", 2, "testDesc");

        when(appointmentRepository.findAppointmentById(id))
                .thenReturn(Optional.empty());

        Optional<Appointment> result = appointmentController.editAppointment(updatedAppointment, id);

        assertFalse(result.isPresent());
    }

    @Test
    public void testAddAppointment_Exception() {
        int volunteerId=1001;
        int familyId=1004;
        int seniorCitizenId=1008;
        Appointment newAppointment = new Appointment(volunteerId, familyId, seniorCitizenId, "2023-11-20", "8:00 AM", "8:30 AM", 2, "testDesc");

        when(appointmentRepository.save(any(Appointment.class))).thenThrow(RuntimeException.class);

        assertThrows(RuntimeException.class, () -> appointmentController.addAppointment(newAppointment));
    }
}
