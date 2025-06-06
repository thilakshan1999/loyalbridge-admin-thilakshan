package com.loyalbridge.backend.dto;

import com.loyalbridge.backend.entity.RoleName;
import lombok.Data;

@Data
public class AdminUserRequest {
    private String email;
    private String password;
    private String userName;
    private RoleName role;
}
