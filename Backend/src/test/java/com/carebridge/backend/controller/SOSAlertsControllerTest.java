package com.carebridge.backend.controller;

import com.carebridge.backend.entity.SOSAlerts;
import com.carebridge.backend.repo.SOSAlertsRepository;
import com.carebridge.backend.service.EmailService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SOSAlertsControllerTest {

    @Mock
    private SOSAlertsRepository sosAlertsRepository;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private SOSAlertsController sosAlertsController;

    @Test
    void testAddSOSAlerts() {
        SOSAlerts sosAlerts = new SOSAlerts(1, 2, "12:00", "Emergency");
        String userEmail = "test@example.com";

        when(sosAlertsRepository.save(any(SOSAlerts.class))).thenReturn(sosAlerts);

        SOSAlerts savedSOSAlerts = sosAlertsController.sosAlerts(sosAlerts, userEmail);

        assertEquals(1, savedSOSAlerts.getElderlyID());
        assertEquals(2, savedSOSAlerts.getVolunteerID());
        assertEquals("12:00", savedSOSAlerts.getTime());
        assertEquals("Emergency", savedSOSAlerts.getReason());

        verify(emailService, times(1)).sendEmail(userEmail, "Add", "Adding sosAlerts successful");
        verify(sosAlertsRepository, times(1)).save(any(SOSAlerts.class));
    }

    @Test
    void testGetAllSOSAlerts() {
        SOSAlerts sosAlerts = new SOSAlerts(1, 2, "12:00", "Emergency");

        when(sosAlertsRepository.findAll()).thenReturn(Collections.singletonList(sosAlerts));

        List<SOSAlerts> result = sosAlertsController.all();

        assertEquals(1, result.size());
        SOSAlerts retrievedSOSAlerts = result.get(0);
        assertEquals(1, retrievedSOSAlerts.getElderlyID());
        assertEquals(2, retrievedSOSAlerts.getVolunteerID());
        assertEquals("12:00", retrievedSOSAlerts.getTime());
        assertEquals("Emergency", retrievedSOSAlerts.getReason());

        verify(sosAlertsRepository, times(1)).findAll();
    }

    @Test
    void testGetSOSAlertsForElderlyAndVolunteer() {
        SOSAlerts sosAlerts = new SOSAlerts(1, 2, "12:00", "Emergency");

        when(sosAlertsRepository.findSOSAlertsByElderlyIDAndVolunteerID(1, 2))
                .thenReturn(Collections.singletonList(sosAlerts));

        List<SOSAlerts> result = sosAlertsController.forElderlyAndVolunteer(1, 2);

        assertEquals(1, result.size());
        SOSAlerts retrievedSOSAlerts = result.get(0);
        assertEquals(1, retrievedSOSAlerts.getElderlyID());
        assertEquals(2, retrievedSOSAlerts.getVolunteerID());
        assertEquals("12:00", retrievedSOSAlerts.getTime());
        assertEquals("Emergency", retrievedSOSAlerts.getReason());

        verify(sosAlertsRepository, times(1)).findSOSAlertsByElderlyIDAndVolunteerID(1, 2);
    }
}