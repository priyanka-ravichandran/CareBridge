package com.carebridge.backend.repo;

import com.carebridge.backend.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AppointmentRepository extends JpaRepository<Appointment,Long> {
List<Appointment> findAppointmentByFamilyMemberId(int familyMemberId);
List<Appointment> findAppointmentByElderlyId(int elderlyId);
Optional<Appointment> findAppointmentByFamilyMemberIdAndElderlyId(int familyMemberId,int elderlyId);
}
