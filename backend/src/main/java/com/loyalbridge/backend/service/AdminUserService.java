package com.loyalbridge.backend.service;

import com.loyalbridge.backend.dto.AdminUserRequest;
import com.loyalbridge.backend.entity.AdminUser;
import com.loyalbridge.backend.entity.Role;
import com.loyalbridge.backend.repository.AdminUserRepository;
import com.loyalbridge.backend.repository.RoleRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminUserService {
    private final AdminUserRepository adminUserRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminUserService(AdminUserRepository adminUserRepository,RoleRepository roleRepository,PasswordEncoder passwordEncoder) {
        this.adminUserRepository = adminUserRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void createAdminUser(AdminUserRequest request) {
        Role role = roleRepository.findByName(request.getRole())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        AdminUser user = new AdminUser();
        user.setEmail(request.getEmail());
        user.setUserName(request.getUserName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(role);

        adminUserRepository.save(user);
    }


    public boolean validateEmailAndPassword(String email, String password) {
        Optional<AdminUser> userOpt = adminUserRepository.findByEmail(email);
        return userOpt.filter(adminUser -> passwordEncoder.matches(password, adminUser.getPassword())).isPresent();
    }

    public Optional<AdminUser> getByEmail(String email) {
        return adminUserRepository.findByEmail(email);
    }

}
