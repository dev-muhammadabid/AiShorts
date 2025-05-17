package dev.abid.aishorts_backend.repositories;

import dev.abid.aishorts_backend.entities.ChatLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatLogRepository extends JpaRepository<ChatLog, Long> {
    List<ChatLog> findAllByOrderByTimestampAsc();
}

