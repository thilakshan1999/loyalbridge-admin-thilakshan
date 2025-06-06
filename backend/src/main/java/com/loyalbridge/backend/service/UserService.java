package com.loyalbridge.backend.service;

import com.loyalbridge.backend.entity.PointHistory;
import com.loyalbridge.backend.entity.User;
import com.loyalbridge.backend.entity.UserFlagStatus;
import com.loyalbridge.backend.entity.UserStatus;
import com.loyalbridge.backend.repository.PointHistoryRepository;
import com.loyalbridge.backend.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private  final UserRepository userRepository;
    private final PointHistoryRepository pointHistoryRepository;

    public UserService(UserRepository userRepository, PointHistoryRepository pointHistoryRepository) {
        this.userRepository = userRepository;
        this.pointHistoryRepository = pointHistoryRepository;
    }

    public Page<User> getUsers(String name, String phone, UserStatus status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        if (status != null) {
            return userRepository.findByNameContainingIgnoreCaseAndPhoneNumberContainingAndStatus(
                    name, phone, status, pageable);
        } else {
            return userRepository.findByNameContainingIgnoreCaseAndPhoneNumberContaining(
                    name, phone, pageable);
        }
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }


    public List<PointHistory> getUserPointHistory(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return pointHistoryRepository.findByUser(user);
    }

    public User updateStatus(Long id, UserStatus status) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setStatus(status);
        return userRepository.save(user);
    }

    // 5. Update user flag status
    public User updateFlagStatus(Long id, UserFlagStatus flagStatus) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setFlagStatus(flagStatus);
        return userRepository.save(user);
    }
}
