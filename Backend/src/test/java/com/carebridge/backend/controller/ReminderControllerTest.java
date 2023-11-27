package com.carebridge.backend.controller;

import com.carebridge.backend.entity.Reminder;
import com.carebridge.backend.repo.ReminderRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class ReminderControllerTest {

    private final ReminderRepository mockRepository = Mockito.mock(ReminderRepository.class);
    private final ReminderController reminderController = new ReminderController(mockRepository);
    private final MockMvc mockMvc = MockMvcBuilders.standaloneSetup(reminderController).build();


    @Test
    void testGetReminderById_ReturnsSingleReminder() throws Exception {
        Reminder reminder = new Reminder();
        reminder.setElderlyId(1);
        when(mockRepository.getRemindersByElderlyId(1)).thenReturn(Arrays.asList(reminder));

        mockMvc.perform(get("/reminder/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].elderlyId").value(1));
    }

    @Test
    void testGetRemindersForElderlyAndDate_ReturnsReminders() throws Exception {
        Reminder reminder1 = new Reminder();
        Reminder reminder2 = new Reminder();
        List<Reminder> reminders = Arrays.asList(reminder1, reminder2);
        when(mockRepository.getRemindersByElderlyIdAndDate(1, "2023-11-30")).thenReturn(reminders);

        mockMvc.perform(get("/reminder/1/2023-11-30"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    void testDeleteReminder_RemovesReminder() throws Exception {
        mockMvc.perform(delete("/reminder/q?reminderNumber=1"))
                .andExpect(status().isOk());

        verify(mockRepository, times(1)).deleteRemindersByReminderNumber("1");
    }
    @Test
    void testGetAllReminders_ReturnsListOfReminders() throws Exception {
        Reminder reminder1 = new Reminder();
        Reminder reminder2 = new Reminder();
        List<Reminder> reminders = Arrays.asList(reminder1, reminder2);
        when(mockRepository.findAll()).thenReturn(reminders);

        mockMvc.perform(get("/reminder"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].elderlyId").exists())
                .andExpect(jsonPath("$[1].volunteerId").exists());
    }

    @Test
    void testReminderPostEndpoint() throws Exception {
        Reminder reminder = new Reminder();

        when(mockRepository.save(any(Reminder.class))).thenReturn(reminder);

        mockMvc.perform(post("/reminder")
                        .contentType("application/json")
                        .content(new ObjectMapper().writeValueAsString(reminder)))
                .andExpect(status().isOk()); // Assuming it returns HTTP status 200 for success

        verify(mockRepository, times(1)).save(any(Reminder.class));
    }

    @Test
    void testUpdateChecklistItem_SuccessfullyUpdatesReminder() {
        ReminderRepository mockRepository = Mockito.mock(ReminderRepository.class);
        ReminderController controller = new ReminderController(mockRepository);

        Reminder newReminder = new Reminder(1, 1, "123", "10:00", "Check-up", "2023-12-01");
        int elderlyId = 1;
        int volunteerId = 1;
        String reminderNumber = "123";

        Reminder existingReminder = new Reminder(elderlyId, volunteerId, reminderNumber, "09:00", "Medication", "2023-12-01");
        when(mockRepository.getRemindersByElderlyIdAndVolunteerIdAndReminderNumber(anyInt(), anyInt(), anyString()))
                .thenReturn(Optional.of(existingReminder));
        when(mockRepository.save(any(Reminder.class))).thenReturn(existingReminder);

        Optional<Reminder> result = controller.updateChecklistItem(newReminder, elderlyId, volunteerId, reminderNumber);

        assertEquals(existingReminder, result.orElse(null));
    }
}
