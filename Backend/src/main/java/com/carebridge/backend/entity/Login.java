package com.carebridge.backend.entity;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Login {
    private String email;
    private String password;

    public Login(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public Login() {}

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    private static final int MD5_HEX_LENGTH = 32;
    private static final int HEX_RADIX = 16;
    public String hashPasswordMD5(String password) {
        StringBuilder returnValue;
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] messageDigest = md.digest(password.getBytes());
            BigInteger no = new BigInteger(1, messageDigest);
            returnValue = new StringBuilder(no.toString(HEX_RADIX));
            while (returnValue.length() < MD5_HEX_LENGTH) {
                returnValue.insert(0, "0");
            }
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }

        return returnValue.toString();
    }
}
