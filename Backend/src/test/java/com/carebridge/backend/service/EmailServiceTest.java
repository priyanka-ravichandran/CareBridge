package com.carebridge.backend.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import static org.mockito.Mockito.*;

public class EmailServiceTest {

    @Mock
    private JavaMailSender javaMailSender;

    @InjectMocks
    private EmailService emailService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testSendEmail() {
        doNothing().when(javaMailSender).send(any(SimpleMailMessage.class));

        emailService.sendEmail("test@example.com", "Test Subject", "Test Message");

        verify(javaMailSender, times(1)).send(any(SimpleMailMessage.class));
    }
}
