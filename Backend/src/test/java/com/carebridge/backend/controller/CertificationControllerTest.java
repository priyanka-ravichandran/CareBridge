package com.carebridge.backend.controller;

import com.carebridge.backend.entity.Certification;
import com.carebridge.backend.repo.CertificationRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.carebridge.backend.service.EmailService;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CertificationControllerTest {

    @Mock
    private CertificationRepository certificationRepository;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private CertificationController certificationController;

    @Test
    void testCertification() {
        Certification certification = new Certification(1, 12345, "Certificate Title");
        String userEmail = "test@example.com";

        when(certificationRepository.save(any(Certification.class))).thenReturn(certification);

        Certification savedCertification = certificationController.certification(certification, userEmail);

        assertEquals(1, savedCertification.getVolunteerID());
        assertEquals(12345, savedCertification.getCertificateNumber());
        assertEquals("Certificate Title", savedCertification.getTitle());

        verify(emailService, times(1)).sendEmail(userEmail, "Add", "Adding certificate was successful");
        verify(certificationRepository, times(1)).save(any(Certification.class));
    }

    @Test
    void testCertifications() {
        int volunteerId = 1;
        Certification certification = new Certification(volunteerId, 12345, "Certificate Title");

        when(certificationRepository.findCertificationByVolunteerID(volunteerId)).thenReturn(Collections.singletonList(certification));

        List<Certification> result = certificationController.certifications(volunteerId);

        assertEquals(1, result.size());
        Certification retrievedCertification = result.get(0);
        assertEquals(volunteerId, retrievedCertification.getVolunteerID());
        assertEquals(12345, retrievedCertification.getCertificateNumber());
        assertEquals("Certificate Title", retrievedCertification.getTitle());

        verify(certificationRepository, times(1)).findCertificationByVolunteerID(volunteerId);
    }
}
