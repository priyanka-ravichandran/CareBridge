package com.carebridge.backend.controller;

import com.carebridge.backend.entity.Appointment;
import com.carebridge.backend.repo.AppointmentRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.ArrayList;
import java.util.Collections;
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
        List<Appointment> appointments = new ArrayList<>();

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
        Appointment existingAppointment = new Appointment(1001, 1004, 1008, "2023-11-20", "8:00 AM", "8:30 AM", 2, "testDesc");
        String id = "1023121";

        Appointment updatedAppointment = new Appointment(1001, 1004, 1008, "2023-11-20", "8:30 AM", "8:45 AM", 2, "New Description");

        when(appointmentRepository.findAppointmentById(id))
                .thenReturn(Optional.of(existingAppointment));
        when(appointmentRepository.save(any(Appointment.class))).thenReturn(updatedAppointment);

        Optional<Appointment> result = appointmentController.editAppointment(updatedAppointment, id);

        assertTrue(result.isPresent());
        assertEquals(updatedAppointment.getDescription(), result.get().getDescription());
    }

    @Test
    void testSeeAppointmentForVolunteerAndFamily() {
        Appointment appointment = new Appointment(1, 2, 3, "2023-12-01", "09:00", "10:00", 1, "Test description");

        when(appointmentRepository.findAppointmentsByVolunteerIdAndFamilyId(1, 2)).thenReturn(Collections.singletonList(appointment));

        List<Appointment> result = appointmentController.seeAppointmentForVolunteerAndFamily(1, 2);

        assertEquals(1, result.size());
        Appointment retrievedAppointment = result.get(0);
        assertEquals(1, retrievedAppointment.getVolunteerId());
        assertEquals(2, retrievedAppointment.getFamilyId());
        assertEquals(3, retrievedAppointment.getSeniorCitizenId());
        assertEquals("2023-12-01", retrievedAppointment.getBookingDate());
        assertEquals("09:00", retrievedAppointment.getBookingStartTime());
        assertEquals("10:00", retrievedAppointment.getBookingEndTime());
        assertEquals(1, retrievedAppointment.getAvailability());
        assertEquals("Test description", retrievedAppointment.getDescription());

        verify(appointmentRepository, times(1)).findAppointmentsByVolunteerIdAndFamilyId(1, 2);
    }

    @Test
    public void testEditAppointment_NotFound() {
        String id = "12312312412";
        Appointment updatedAppointment = new Appointment(1001, 1004, 1008, "2023-11-20", "8:00 AM", "8:30 AM", 2, "testDesc");

        when(appointmentRepository.findAppointmentById(id))
                .thenReturn(Optional.empty());

        Optional<Appointment> result = appointmentController.editAppointment(updatedAppointment, id);

        assertFalse(result.isPresent());
    }

    @Test
    public void testAddAppointment_Exception() {
        Appointment newAppointment = new Appointment(1001, 1004, 1008, "2023-11-20", "8:00 AM", "8:30 AM", 2, "testDesc");

        when(appointmentRepository.save(any(Appointment.class))).thenThrow(RuntimeException.class);

        assertThrows(RuntimeException.class, () -> appointmentController.addAppointment(newAppointment));
    }
}
