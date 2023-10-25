package com.carebridge.backend.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Long userId) {
        super("Could not find user: " + userId);
    }
}
