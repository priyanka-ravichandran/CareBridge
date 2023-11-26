package com.carebridge.backend.controller;

import com.carebridge.backend.entity.AppUser;
import com.carebridge.backend.entity.Pairings;
import com.carebridge.backend.repo.AppUserRepository;
import com.carebridge.backend.service.EmailService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import com.carebridge.backend.repo.PairingsRepository;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class PairingsControllerTest {

    @Mock
    private PairingsRepository pairingsRepository;

    @Mock
    private AppUserRepository appUserRepository;

    private EmailService emailService;


    @InjectMocks
    private PairingsController pairingsController;


    @Test
    void testGetAllPairings_ReturnsListOfPairings() {
        List<Pairings> pairingList = Collections.singletonList(new Pairings(/* create a Pairings object */));
        when(pairingsRepository.findAll()).thenReturn(pairingList);

        List<Pairings> result = pairingsController.getAllPairings();

        assertEquals(pairingList, result);
    }

    @Test
    void testGetPairingsForElderly_ReturnsListOfPairings() {
        List<Pairings> pairingList = Collections.singletonList(new Pairings(/* create a Pairings object */));
        when(pairingsRepository.getPairingsBySeniorCitizenId(anyInt())).thenReturn(pairingList);

        List<Pairings> result = pairingsController.getPairingsForElderly(1, null);

        assertEquals(pairingList, result);
    }

    @Test
    void testGetPairingsForFamily_ReturnsListOfPairings() {
        List<Pairings> pairingList = Collections.singletonList(new Pairings(/* create a Pairings object */));
        when(pairingsRepository.getPairingsByFamilyId(anyInt())).thenReturn(pairingList);

        List<Pairings> result = pairingsController.getPairingsForElderly(null, 1);

        assertEquals(pairingList, result);
    }

    @Test
    void testAddPairing() {
        PairingsRepository mockPairingsRepository = Mockito.mock(PairingsRepository.class);
        AppUserRepository mockAppUserRepository = Mockito.mock(AppUserRepository.class);
        EmailService mockEmailService = Mockito.mock(EmailService.class);
        PairingsController controller = new PairingsController(mockPairingsRepository, mockAppUserRepository, mockEmailService);

        Pairings pairings = new Pairings(1, 2);
        String userEmail = "test@example.com";

        Mockito.doNothing().when(mockEmailService).sendEmail(anyString(), anyString(), anyString());

        when(mockPairingsRepository.save(any(Pairings.class))).thenReturn(pairings);

        Pairings result = controller.addPairing(pairings, userEmail);

        Mockito.verify(mockEmailService).sendEmail(eq(userEmail), eq("Add"), eq("Adding pairing successful"));

        Mockito.verify(mockPairingsRepository).save(pairings);

        assertEquals(pairings, result);
    }
}
