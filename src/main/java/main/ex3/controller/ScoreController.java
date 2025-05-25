package main.ex3.controller;

import main.ex3.model.ScoreEntry;
import main.ex3.service.ScoreService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scores")
public class ScoreController {

    private final ScoreService scoreService;

    public ScoreController(ScoreService scoreService) {
        this.scoreService = scoreService;
    }

    // GET /api/scores - get full leaderboard sorted by score (descending)
    @GetMapping
    public ResponseEntity<List<ScoreEntry>> getAllScores() {
        return ResponseEntity.ok(scoreService.getAllScoresSorted());
    }

    // POST /api/scores - add a new score entry
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
