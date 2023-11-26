package com.carebridge.backend.controller;

import com.carebridge.backend.entity.Pairings;
import com.carebridge.backend.repo.AppUserRepository;
import com.carebridge.backend.repo.PairingsRepository;
import com.carebridge.backend.service.EmailService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class PairingsController {
    private final PairingsRepository pairingsRepository;
    private final AppUserRepository appUserRepository;
    private final EmailService emailService;

    public PairingsController(PairingsRepository pairingsRepository, AppUserRepository appUserRepository, EmailService emailService) {
        this.pairingsRepository = pairingsRepository;
        this.appUserRepository = appUserRepository;
        this.emailService = emailService;
    }

    @PostMapping("/pairings")
    @CrossOrigin(origins = "*")
    Pairings addPairing(@RequestBody Pairings pairings) {
        // emailService.sendEmail(userEmail,"Add","Adding pairing successful");
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

    @GetMapping("/getPairedEmails/q")
    @CrossOrigin(origins = "*")
    List<String> getEmailsOfPairedUsers(@RequestParam int appUserId) {
        String userType = appUserRepository.findAppUserByUserID(appUserId).get().getType();
        List<String> retList = new ArrayList<>();
        List<Pairings> pairings = new ArrayList<>();
        if (userType.equals("senior")) {
            pairings = pairingsRepository.getPairingsBySeniorCitizenId(appUserId);
        } else if (userType.equals("family")) {
            pairings = pairingsRepository.getPairingsByFamilyId(appUserId);
        }

        for (Pairings pairing : pairings) {
            if (userType.equals("senior")) {
                retList.add(appUserRepository.findAppUserByUserID(pairing.getFamilyId()).get().getEmail());
            } else {
                retList.add(appUserRepository.findAppUserByUserID(pairing.getSeniorCitizenId()).get().getEmail());
            }
        }

        return retList;
    }
}
