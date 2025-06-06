package com.loyalbridge.backend.repository;

import com.loyalbridge.backend.entity.User;
import com.loyalbridge.backend.entity.UserStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    Page<User> findByNameContainingIgnoreCaseAndPhoneNumberContaining(
            String name,
            String phone,
            Pageable pageable
    );

    Page<User> findByNameContainingIgnoreCaseAndPhoneNumberContainingAndStatus(
            String name,
            String phone,
            UserStatus status,
            Pageable pageable
    );
}
