package com.loyalbridge.backend.repository;

import com.loyalbridge.backend.entity.AdminUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminUserRepository extends JpaRepository<AdminUser,Long> {
    Optional<AdminUser> findByEmail(String email);
}
