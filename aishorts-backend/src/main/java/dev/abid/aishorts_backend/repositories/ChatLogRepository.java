// Package Declaration
package dev.abid.aishorts_backend.repositories;

// Imports
import dev.abid.aishorts_backend.entities.ChatLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for performing CRUD operations on ChatLog entities.
 * Extends JpaRepository to provide standard database operations.
 */
@Repository
public interface ChatLogRepository extends JpaRepository<ChatLog, Long> {

    /**
     * Retrieves all ChatLog records ordered by their timestamp in ascending order.
     *
     * @return List of ChatLog objects sorted by timestamp ascending
     */
    List<ChatLog> findAllByOrderByTimestampAsc();

}
