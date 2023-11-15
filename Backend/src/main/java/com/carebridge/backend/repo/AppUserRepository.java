package com.carebridge.backend.repo;

import com.carebridge.backend.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findAppUserByUserID(int userId);
    Optional<AppUser> findAppUserByEmail(String email);
}
