package com.carebridge.backend.entity;

public class Family {
    private int familyMemberId;
    private String languages;

    public Family(int familyMemberId, String languages) {
        this.familyMemberId = familyMemberId;
        this.languages = languages;
    }

    public int getFamilyMemberId() {
        return familyMemberId;
    }

    public String getLanguages() {
        return languages;
    }
}
