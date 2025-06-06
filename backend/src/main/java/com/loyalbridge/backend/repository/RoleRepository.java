package com.loyalbridge.backend.repository;

import com.loyalbridge.backend.entity.Role;
import com.loyalbridge.backend.entity.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository  extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName name);
}
