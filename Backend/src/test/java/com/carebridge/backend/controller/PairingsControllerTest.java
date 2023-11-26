package com.carebridge.backend.controller;

import com.carebridge.backend.entity.Pairings;
import com.carebridge.backend.repo.AppUserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import com.carebridge.backend.repo.PairingsRepository;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class PairingsControllerTest {

    @Mock
    private PairingsRepository pairingsRepository;

    @Mock
    private AppUserRepository appUserRepository;


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
}
