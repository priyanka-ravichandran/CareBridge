package com.carebridge.backend.entity.id;

import java.io.Serializable;

public class PairingsId implements Serializable {
    private int seniorCitizenId;
    private int familyId;

    public PairingsId() {}

    public PairingsId(int seniorCitizenId, int familyId) {
        this.seniorCitizenId = seniorCitizenId;
        this.familyId = familyId;
    }
}
