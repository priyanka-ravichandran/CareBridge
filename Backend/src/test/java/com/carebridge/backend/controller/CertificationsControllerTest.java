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
        int volunteerId=1;
        int certificateNumber=123;
        Certification certification = new Certification(volunteerId, certificateNumber, "Java Developer");
        Mockito.when(certificationRepository.save(certification)).thenReturn(certification);

        Certification result = certificationController.certification(certification);

        assertEquals(certification, result);
    }

    @Test
    void testGetCertificationsForVolunteer() {
        int volunteerId = 1;
        int certificateNumber1=123;
        int certificateNumber2=124;
        List<Certification> certificationsList = new ArrayList<>();
        certificationsList.add(new Certification(volunteerId, certificateNumber1, "Java Developer"));
        certificationsList.add(new Certification(volunteerId, certificateNumber2, "Web Designer"));

        Mockito.when(certificationRepository.findCertificationByVolunteerID(volunteerId)).thenReturn(certificationsList);

        List<Certification> result = certificationController.certifications(volunteerId);

        assertEquals(certificationsList, result);
    }
}