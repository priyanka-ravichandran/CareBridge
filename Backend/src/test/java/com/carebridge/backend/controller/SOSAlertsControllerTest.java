package com.carebridge.backend.controller;

import com.carebridge.backend.entity.SOSAlerts;
import com.carebridge.backend.repo.SOSAlertsRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class SOSAlertsControllerTest {

    private SOSAlertsController sosAlertsController;

    @Mock
    private SOSAlertsRepository sosAlertsRepository;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        sosAlertsController = new SOSAlertsController(sosAlertsRepository);
    }

    @Test
    void testCreateSOSAlert() {
        SOSAlerts sosAlert = new SOSAlerts(1, 2, "2023-10-30 14:30:00", "Emergency");
        Mockito.when(sosAlertsRepository.save(sosAlert)).thenReturn(sosAlert);

        SOSAlerts result = sosAlertsController.sosAlerts(sosAlert);

        assertEquals(sosAlert, result);
    }

    @Test
    void testGetAllSOSAlerts() {
        List<SOSAlerts> sosAlertsList = new ArrayList<>();
        sosAlertsList.add(new SOSAlerts(1, 2, "2023-10-30 14:30:00", "Emergency"));
        sosAlertsList.add(new SOSAlerts(3, 4, "2023-10-30 15:00:00", "Medical"));

        Mockito.when(sosAlertsRepository.findAll()).thenReturn(sosAlertsList);

        List<SOSAlerts> result = sosAlertsController.all();

        assertEquals(sosAlertsList, result);
    }

    @Test
    void testGetSOSAlertsForElderlyAndVolunteer() {
        int elderlyId = 1;
        int volunteerId = 2;
        List<SOSAlerts> sosAlertsList = new ArrayList<>();
        sosAlertsList.add(new SOSAlerts(1, 2, "2023-10-30 14:30:00", "Emergency"));
        sosAlertsList.add(new SOSAlerts(1, 2, "2023-10-30 15:00:00", "Medical"));

        Mockito.when(sosAlertsRepository.findSOSAlertsByElderlyIDAndVolunteerID(elderlyId, volunteerId)).thenReturn(sosAlertsList);

        List<SOSAlerts> result = sosAlertsController.forElderlyAndVolunteer(elderlyId, volunteerId);

        assertEquals(sosAlertsList, result);
    }
}