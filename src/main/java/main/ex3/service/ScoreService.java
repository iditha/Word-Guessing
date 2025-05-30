package main.ex3.service;

import main.ex3.model.ScoreEntry;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.*;
import java.util.stream.Collectors;


/**
 * A service for managing user scores using file-based persistence.
 *
 * <p>Supports adding scores and retrieving them (all or top N), with built-in thread-safety.</p>
 *
 * <p>Scores are stored in a serialized file: {@code scores.ser}.</p>
 *
 * <p>When a user submits a score, the service will only update their stored score
 * if the new score is higher than their previous best.</p>
 *
 * <p>All methods are thread-safe.</p>
 *
 * @author Idit Halevi
 * @version 1.0
 * @since 2025-05-30
 */
@Service
public class ScoreService {
    private static final String SCORE_FILE = "scores.ser";
    private final Object lock = new Object();

    /**
     * Loads the list of scores from the file.
     *
     * @return a list of {@link ScoreEntry} objects; empty if file doesn't exist
     * @throws RuntimeException if deserialization fails
     */
    private List<ScoreEntry> loadScoresInternal() {
        File file = new File(SCORE_FILE);
        if (!file.exists()) return new ArrayList<>();
        try (ObjectInputStream in = new ObjectInputStream(new FileInputStream(file))) {
            return (List<ScoreEntry>) in.readObject();
        } catch (Exception e) {
            throw new RuntimeException("Failed to load scores.ser", e);
        }
    }

    /**
     * Saves the given list of scores to the file.
     *
     * @param scores the list to persist
     * @throws RuntimeException if serialization fails
     */
    private void saveScoresInternal(List<ScoreEntry> scores) {
        try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream(SCORE_FILE))) {
            out.writeObject(scores);
        } catch (IOException e) {
            throw new RuntimeException("Failed to save scores.ser", e);
        }
    }

    /**
     * Adds a new score entry or updates an existing one if the new score is higher.
     *
     * @param newEntry the new {@link ScoreEntry}
     */
    public void addScore(ScoreEntry newEntry) {
        synchronized (lock) {
            List<ScoreEntry> scores = loadScoresInternal();

            Optional<ScoreEntry> existingEntryOpt = scores.stream()
                    .filter(e -> e.getNickname().equalsIgnoreCase(newEntry.getNickname()))
                    .findFirst();

            if (existingEntryOpt.isPresent()) {
                ScoreEntry existingEntry = existingEntryOpt.get();
                if (newEntry.getScore() > existingEntry.getScore()) {
                    existingEntry.setScore(newEntry.getScore());
                }
                // else: ignore because the old score is higher
            } else {
                scores.add(newEntry);
            }

            saveScoresInternal(scores);
        }
    }

    /**
     * Retrieves the top N scores sorted in descending order.
     *
     * @param maxResults maximum number of top scores to return
     * @return list of top {@link ScoreEntry} objects
     */
    public List<ScoreEntry> getTopScores(int maxResults) {
        synchronized (lock) {
            return loadScoresInternal().stream()
                    .sorted(Comparator.comparingInt(ScoreEntry::getScore).reversed())
                    .limit(maxResults)
                    .collect(Collectors.toList());
        }
    }

    /**
     * Retrieves all scores sorted in descending order.
     *
     * @return list of all {@link ScoreEntry} objects
     */
    public List<ScoreEntry> getAllScoresSorted() {
        synchronized (lock) {
            return loadScoresInternal().stream()
                    .sorted(Comparator.comparingInt(ScoreEntry::getScore).reversed())
                    .collect(Collectors.toList());
        }
    }
}
