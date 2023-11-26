package com.carebridge.backend.controller;

import com.carebridge.backend.entity.MedicineReminder;
import com.carebridge.backend.service.EmailService;
import org.junit.jupiter.api.Test;
import com.carebridge.backend.repo.MedicineReminderRepository;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
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
    void testMedicineReminder_SuccessfullyAdds() {
        MedicineReminderRepository mockRepository = Mockito.mock(MedicineReminderRepository.class);
        EmailService mockEmailService = Mockito.mock(EmailService.class);
        MedicineReminderController controller = new MedicineReminderController(mockRepository, mockEmailService);

        MedicineReminder medicineReminder = new MedicineReminder(1001, 1032, "123", "10:00", "Medicine A", "Monday");
        String userEmail = "test@example.com";

        when(mockRepository.save(any(MedicineReminder.class))).thenReturn(medicineReminder);

        MedicineReminder result = controller.medicineReminder(medicineReminder, userEmail);

        verify(mockEmailService, times(1)).sendEmail(userEmail, "Add", "Adding medicine reminder successful");
        verify(mockRepository, times(1)).save(medicineReminder);
        assertEquals(medicineReminder, result);
    }

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

    @Test
    void testUpdateChecklistItem_SuccessfullyUpdatesReminder() {

        MedicineReminderRepository mockRepository = Mockito.mock(MedicineReminderRepository.class);
        EmailService mockEmailService = Mockito.mock(EmailService.class);
        MedicineReminderController controller = new MedicineReminderController(mockRepository, mockEmailService);

        MedicineReminder existingReminder = new MedicineReminder(1, 1, "123", "08:00", "Medicine", "Monday");
        MedicineReminder updatedReminder = new MedicineReminder(1, 1, "123", "09:00", "NewMedicine", "Tuesday");

        when(mockRepository.getMedicineReminderByElderlyIdAndVolunteerIdAndMedicineReminderNumber(anyInt(), anyInt(), anyString()))
                .thenReturn(Optional.of(existingReminder));
        when(mockRepository.save(existingReminder)).thenReturn(updatedReminder);

        Optional<MedicineReminder> result = controller.updateChecklistItem(updatedReminder, 1, 1, "123", "test@example.com");

        assertEquals(updatedReminder.getTime(), result.orElseThrow().getTime());
        assertEquals(updatedReminder.getMedicineName(), result.orElseThrow().getMedicineName());
    }

    @Test
    void testDeleteReminder_SuccessfullyDeletes() {
        MedicineReminderRepository mockRepository = Mockito.mock(MedicineReminderRepository.class);
        EmailService mockEmailService = Mockito.mock(EmailService.class);
        MedicineReminderController controller = new MedicineReminderController(mockRepository, mockEmailService);

        String medicineReminderNumber = "123";
        String userEmail = "test@example.com";

        controller.deleteReminder(medicineReminderNumber, userEmail);

        verify(mockEmailService, times(1)).sendEmail(userEmail, "Delete", "Deleting medicine reminder successful");
        verify(mockRepository, times(1)).deleteMedicineReminderByMedicineReminderNumber(medicineReminderNumber);
    }
}
