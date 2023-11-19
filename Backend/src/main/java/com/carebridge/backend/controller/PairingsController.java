package com.carebridge.backend.controller;

import com.carebridge.backend.entity.Pairings;
import com.carebridge.backend.repo.PairingsRepository;
import com.carebridge.backend.service.EmailService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PairingsController {
    private final PairingsRepository pairingsRepository;
    private final EmailService emailService;

    public PairingsController(PairingsRepository pairingsRepository, EmailService emailService) {
        this.pairingsRepository = pairingsRepository;
        this.emailService = emailService;
    }

    @PostMapping("/pairings")
    @CrossOrigin(origins = "*")
    Pairings addPairing(@RequestBody Pairings pairings,@RequestParam String userEmail) {
        emailService.sendEmail(userEmail,"Add","Adding pairing successful");
        return pairingsRepository.save(pairings);
    }

    @GetMapping("/pairings")
    @CrossOrigin(origins = "*")
    List<Pairings> getAllPairings() {
        return pairingsRepository.findAll();
    }

    @GetMapping("/pairings/q")
    @CrossOrigin(origins = "*")
    List<Pairings> getPairingsForElderly(@RequestParam(required = false) Integer elderlyId, @RequestParam(required = false) Integer familyId) {
        if (familyId == null) {
            return pairingsRepository.getPairingsBySeniorCitizenId(elderlyId);
        } else if (elderlyId == null) {
            return pairingsRepository.getPairingsByFamilyId(familyId);
        }
        return pairingsRepository.getPairingsByFamilyIdAndSeniorCitizenId(familyId, elderlyId);
    }
}
