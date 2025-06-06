package com.loyalbridge.backend.controller;

import com.loyalbridge.backend.dto.AdminUserRequest;
import com.loyalbridge.backend.dto.ApiResponse;
import com.loyalbridge.backend.dto.LoginRequest;
import com.loyalbridge.backend.dto.OtpRequest;
import com.loyalbridge.backend.entity.AdminUser;
import com.loyalbridge.backend.security.JwtTokenUtil;
import com.loyalbridge.backend.service.AdminUserService;
import com.loyalbridge.backend.service.OtpService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin-user")
public class AdminUserController {
    private final AdminUserService adminUserService;
    private final OtpService otpService;
    private final JwtTokenUtil jwtTokenUtil;

    public AdminUserController(AdminUserService adminUserService, OtpService otpService,JwtTokenUtil jwtTokenUtil) {
        this.adminUserService = adminUserService;
        this.otpService = otpService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    // TEMPORARY: Only for setup, comment out after use
//    @PostMapping("/create")
//    public ResponseEntity<String> createAdminUser(@RequestBody AdminUserRequest request) {
//        adminUserService.createAdminUser(request);
//        return ResponseEntity.ok("Admin user created successfully");
//    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Object>> login(@RequestBody LoginRequest request) {
        boolean isValid = adminUserService.validateEmailAndPassword(
                request.getEmail(),
                request.getPassword()
        );

        if (isValid) {
            otpService.generateOtpForEmail(request.getEmail());
            return ResponseEntity.ok(
                    new ApiResponse<>(true, "Login successful. Proceed to OTP verification.", null)
            );
        } else {
            return ResponseEntity.status(401).body(
                    new ApiResponse<>(false, "Invalid email or password", null)
            );
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<ApiResponse<Object>> verifyOtp(@RequestBody OtpRequest request) {
        boolean isValid = otpService.verifyOtp(request.getEmail(), request.getOtp());

        if (isValid) {
            otpService.clearOtp(request.getEmail());
            AdminUser user = adminUserService.getByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            String token = jwtTokenUtil.generateToken(
                    user.getEmail(),
                    user.getUserName(),
                    user.getRole().getName().name()
            );

            return ResponseEntity.ok(
                    new ApiResponse<>(true, "OTP verified successfully", token )
            );
        } else {
            return ResponseEntity.status(401).body(
                    new ApiResponse<>(false, "Invalid OTP or email", null)
            );
        }
    }

}
