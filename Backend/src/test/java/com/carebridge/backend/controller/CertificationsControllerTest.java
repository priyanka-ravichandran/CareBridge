package com.carebridge.backend.controller;

import com.carebridge.backend.entity.Certification;
import com.carebridge.backend.repo.CertificationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CertificationsControllerTest {

    private CertificationController certificationController;

    @Mock
    private CertificationRepository certificationRepository;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        certificationController = new CertificationController(certificationRepository, emailService);
    }

    @Test
    void testCreateCertification() {
        Certification certification = new Certification(1, 123, "Java Developer");
        Mockito.when(certificationRepository.save(certification)).thenReturn(certification);

        Certification result = certificationController.certification(certification);

        assertEquals(certification, result);
    }

    @Test
    void testGetCertificationsForVolunteer() {
        int volunteerId = 1;
        List<Certification> certificationsList = new ArrayList<>();
        certificationsList.add(new Certification(1, 123, "Java Developer"));
        certificationsList.add(new Certification(1, 124, "Web Designer"));

        Mockito.when(certificationRepository.findCertificationByVolunteerID(volunteerId)).thenReturn(certificationsList);

        List<Certification> result = certificationController.certifications(volunteerId);

        assertEquals(certificationsList, result);
    }
}