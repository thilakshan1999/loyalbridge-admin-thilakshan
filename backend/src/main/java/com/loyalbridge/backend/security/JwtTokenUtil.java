package com.loyalbridge.backend.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtTokenUtil {
    private final SecretKey jwtSecret = Keys.hmacShaKeyFor("Lx7@J2w!qP9#Tk8$Rm5&Ve1*Zb6@Yi3^".getBytes());

    public String generateToken(String email,String username, String role) {
        Date now = new Date();
        // 1 day
        long jwtExpirationMs = 86400000;
        Date expiryDate = new Date(now.getTime() + jwtExpirationMs);

        return Jwts.builder()
                .subject(email)
                .claim("username", username)
                .claim("role", role)
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(jwtSecret)
                .compact();
    }


    public String getEmailFromToken(String token) {
        return Jwts.parser()
                .verifyWith(jwtSecret)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(jwtSecret)
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
