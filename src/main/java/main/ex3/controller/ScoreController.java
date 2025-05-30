package main.ex3.controller;

import main.ex3.model.ScoreEntry;
import main.ex3.service.ScoreService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller that handles score-related endpoints for the leaderboard.
 *
 * <p>Provides endpoints to retrieve the full leaderboard and submit new scores.</p>
 *
 * @author Idit Halevi
 * @version 1.0
 * @since   2025-05-30
 */
@RestController
@RequestMapping("/api/scores")
public class ScoreController {

    private final ScoreService scoreService;

    /**
     * Constructs a new {@code ScoreController} with the given {@link ScoreService}.
     *
     * @param scoreService the service used to manage score data
     */
    public ScoreController(ScoreService scoreService) {
        this.scoreService = scoreService;
    }

    /**
     * Retrieves all scores from the leaderboard, sorted in descending order.
     *
     * <p>Handles HTTP GET requests to {@code /api/scores}.</p>
     *
     * @return a {@link ResponseEntity} containing the sorted list of {@link ScoreEntry}
     */
    @GetMapping
    public ResponseEntity<List<ScoreEntry>> getAllScores() {
        return ResponseEntity.ok(scoreService.getAllScoresSorted());
    }

    /**
     * Adds a new score entry to the leaderboard.
     *
     * <p>Handles HTTP POST requests to {@code /api/scores}.</p>
     *
     * @param entry the {@link ScoreEntry} object to add
     * @return a {@link ResponseEntity} with the result of the operation;
     *         returns 201 (Created) on success, 400 (Bad Request) if input is invalid,
     *         or 500 (Internal Server Error) if an unexpected error occurs
     */
    @PostMapping
    public ResponseEntity<?> addScore(@RequestBody ScoreEntry entry) {
        try {
            scoreService.addScore(entry);
            return ResponseEntity.status(HttpStatus.CREATED).body("Score submitted successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save score.");
        }
    }
}
