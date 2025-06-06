package com.loyalbridge.backend.controller;

import com.loyalbridge.backend.dto.ApiResponse;
import com.loyalbridge.backend.entity.PointHistory;
import com.loyalbridge.backend.entity.User;
import com.loyalbridge.backend.entity.UserFlagStatus;
import com.loyalbridge.backend.entity.UserStatus;
import com.loyalbridge.backend.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<User>>> getUsers(
            @RequestParam(defaultValue = "") String name,
            @RequestParam(defaultValue = "") String phone,
            @RequestParam(required = false) UserStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        try {
            Page<User> users = userService.getUsers(name, phone, status, page, size);
            return ResponseEntity.ok(new ApiResponse<>(true, "Users fetched successfully", users));
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(new ApiResponse<>(false, "Error fetching users: " + e.getMessage(), null));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<User>> getUserById(@PathVariable Long id) {
        try {
            User user = userService.getUserById(id);
            return ResponseEntity.ok(new ApiResponse<>(true, "User fetched successfully", user));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @GetMapping("/{id}/points")
    public ResponseEntity<ApiResponse<List<PointHistory>>> getUserPointHistory(@PathVariable Long id) {
        try {
            List<PointHistory> history = userService.getUserPointHistory(id);
            return ResponseEntity.ok(new ApiResponse<>(true, "Point history fetched successfully", history));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<User>> updateUserStatus(@PathVariable Long id, @RequestParam UserStatus status) {
        try {
            User updatedUser = userService.updateStatus(id, status);
            return ResponseEntity.ok(new ApiResponse<>(true, "User status updated", updatedUser));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @PatchMapping("/{id}/flag")
    public ResponseEntity<ApiResponse<User>> updateUserFlagStatus(@PathVariable Long id, @RequestParam UserFlagStatus flagStatus) {
        try {
            User updatedUser = userService.updateFlagStatus(id, flagStatus);
            return ResponseEntity.ok(new ApiResponse<>(true, "User flag status updated", updatedUser));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }
}
