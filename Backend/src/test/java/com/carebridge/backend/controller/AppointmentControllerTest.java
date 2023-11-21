package com.carebridge.backend.controller;

import com.carebridge.backend.controller.AppointmentController;
import com.carebridge.backend.entity.Appointment;
import com.carebridge.backend.repo.AppointmentRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyInt;
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
        Appointment newAppointment = new Appointment("Address", LocalDateTime.now(), true, 1, 2, 10);

        when(appointmentRepository.save(any(Appointment.class))).thenReturn(newAppointment);

        Appointment result = appointmentController.addAppointment(newAppointment);

        assertEquals(newAppointment.getAddress(), result.getAddress());
    }

    @Test
    public void testEditAppointment() {
        Appointment existingAppointment = new Appointment("Old Address", LocalDateTime.now(), false, 1, 2, 5);
        int familyMemberId = 2;
        int elderlyId = 1;

        Appointment updatedAppointment = new Appointment("New Address", LocalDateTime.now().plusHours(1), true, 3, 4, 15);

        when(appointmentRepository.findAppointmentByFamilyMemberIdAndElderlyId(familyMemberId, elderlyId))
                .thenReturn(Optional.of(existingAppointment));
        when(appointmentRepository.save(any(Appointment.class))).thenReturn(updatedAppointment);

        Optional<Appointment> result = appointmentController.editAppointment(updatedAppointment, familyMemberId, elderlyId);

        assertTrue(result.isPresent());
        assertEquals(updatedAppointment.getAddress(), result.get().getAddress());
    }

    @Test
    public void testSeeAppointmentElderly() {
        int elderlyId = 1;
        List<Appointment> appointments = new ArrayList<>();
        // TODO: Add mock appointments for the elderly ID

        when(appointmentRepository.findAppointmentByElderlyId(elderlyId)).thenReturn(appointments);

        List<Appointment> result = appointmentController.seeAppointmentElderly(elderlyId);

        assertEquals(appointments.size(), result.size());
    }

    @Test
    public void testSeeAppointmentFamily() {
        int familyMemberId = 2;
        List<Appointment> appointments = new ArrayList<>();
        // TODO: Add mock appointments for the family member ID

        when(appointmentRepository.findAppointmentByFamilyMemberId(familyMemberId)).thenReturn(appointments);

        List<Appointment> result = appointmentController.seeAppointmentFamily(familyMemberId);

        assertEquals(appointments.size(), result.size());
    }

    @Test
    public void testEditAppointment_NotFound() {
        int familyMemberId = 2;
        int elderlyId = 1;
        Appointment updatedAppointment = new Appointment("New Address", LocalDateTime.now().plusHours(1), true, 3, 4, 15);

        when(appointmentRepository.findAppointmentByFamilyMemberIdAndElderlyId(familyMemberId, elderlyId))
                .thenReturn(Optional.empty());

        Optional<Appointment> result = appointmentController.editAppointment(updatedAppointment, familyMemberId, elderlyId);

        assertFalse(result.isPresent());
    }

    @Test
    public void testAddAppointment_Exception() {
        Appointment newAppointment = new Appointment("Address", LocalDateTime.now(), true, 1, 2, 10);

        when(appointmentRepository.save(any(Appointment.class))).thenThrow(RuntimeException.class);

        assertThrows(RuntimeException.class, () -> appointmentController.addAppointment(newAppointment));
    }
}
