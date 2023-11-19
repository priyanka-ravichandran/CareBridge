package com.carebridge.backend.controller;

import com.carebridge.backend.entity.Pairings;
import com.carebridge.backend.repo.AppUserRepository;
import com.carebridge.backend.repo.PairingsRepository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class PairingsController {
    private final PairingsRepository pairingsRepository;
    private final AppUserRepository appUserRepository;

    public PairingsController(PairingsRepository pairingsRepository, AppUserRepository appUserRepository) {
        this.pairingsRepository = pairingsRepository;
        this.appUserRepository = appUserRepository;
    }

    @PostMapping("/pairings")
    @CrossOrigin(origins = "*")
    Pairings addPairing(@RequestBody Pairings pairings) {
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
    List<String> getEmailsForPairedGuardians(@RequestParam int seniorCitizenId) {
        List<String> retList = new ArrayList<>();
        List<Pairings> pairings = pairingsRepository.getPairingsBySeniorCitizenId(seniorCitizenId);

        for (Pairings pairing : pairings) {
            retList.add(appUserRepository.findAppUserByUserID(pairing.getFamilyId()).get().getEmail());
        }

        return retList;
    }
}
