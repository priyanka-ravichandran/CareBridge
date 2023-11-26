package com.carebridge.backend.controller;

import com.carebridge.backend.entity.MedicineReminder;
import org.junit.jupiter.api.Test;
import com.carebridge.backend.repo.MedicineReminderRepository;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class MedicineReminderControllerTest {

    @Mock
    private MedicineReminderRepository medicineReminderRepository;


    @InjectMocks
    private MedicineReminderController medicineReminderController;


    @Test
    void testGetAllReminders_ReturnsListOfReminders() {
        List<MedicineReminder> reminderList = Collections.singletonList(new MedicineReminder(/* create a MedicineReminder object */));
        when(medicineReminderRepository.findAll()).thenReturn(reminderList);

        List<MedicineReminder> result = medicineReminderController.all();

        assertEquals(reminderList, result);
    }

    @Test
    void testGetRemindersForElderly_ReturnsListOfReminders() {
        int elderlyId = 1001; // Set a valid elderly ID
        List<MedicineReminder> reminderList = Collections.singletonList(new MedicineReminder(/* create a MedicineReminder object */));
        when(medicineReminderRepository.getMedicineReminderByElderlyId(eq(elderlyId))).thenReturn(reminderList);

        List<MedicineReminder> result = medicineReminderController.getRemindersForElderly(elderlyId);

        assertEquals(reminderList, result);
    }
}
