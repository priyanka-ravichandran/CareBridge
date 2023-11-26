package com.carebridge.backend.exception;

import com.carebridge.backend.exception.UserNotFoundException;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class UserNotFoundExceptionTest {

    @Test
    void testUserNotFoundExceptionMessage() {
        Long userId = 123L;
        UserNotFoundException exception = new UserNotFoundException(userId);

        String expectedMessage = "Could not find user: " + userId;
        String actualMessage = exception.getMessage();

        assertEquals(expectedMessage, actualMessage);
    }
}