package com.loyalbridge.backend.repository;

import com.loyalbridge.backend.entity.PointHistory;
import com.loyalbridge.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PointHistoryRepository extends JpaRepository<PointHistory,Long> {
    List<PointHistory> findByUser(User user);
}
