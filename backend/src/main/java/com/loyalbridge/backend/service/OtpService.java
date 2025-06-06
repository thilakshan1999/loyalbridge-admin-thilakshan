package com.loyalbridge.backend.service;

import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {
    // Map to store email -> OTP
    private final Map<String, String> otpCache = new ConcurrentHashMap<>();

    private static final String DUMMY_OTP = "123456";

    // Save OTP for email (mock generating OTP here)
    public void generateOtpForEmail(String email) {
        // In real app, generate random OTP and send email
        otpCache.put(email, DUMMY_OTP);
    }

    public boolean verifyOtp(String email, String otp) {
        String cachedOtp = otpCache.get(email);
        return otp != null && otp.equals(cachedOtp);
    }

    // Optional: clear OTP after verification
    public void clearOtp(String email) {
        otpCache.remove(email);
    }
}
