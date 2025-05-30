package main.ex3.service;

import main.ex3.model.ScoreEntry;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ScoreService {
    private static final String SCORE_FILE = "scores.ser";
    private final Object lock = new Object();

    // Internal method to load scores
    private List<ScoreEntry> loadScoresInternal() {
        File file = new File(SCORE_FILE);
        if (!file.exists()) return new ArrayList<>();
        try (ObjectInputStream in = new ObjectInputStream(new FileInputStream(file))) {
            return (List<ScoreEntry>) in.readObject();
        } catch (Exception e) {
            throw new RuntimeException("Failed to load scores.ser", e);
        }
    }

    // Internal method to save scores
    private void saveScoresInternal(List<ScoreEntry> scores) {
        try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream(SCORE_FILE))) {
            out.writeObject(scores);
        } catch (IOException e) {
            throw new RuntimeException("Failed to save scores.ser", e);
        }
    }

    // Thread-safe method to add a new score
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

    // Thread-safe method to get top scores
    public List<ScoreEntry> getTopScores(int maxResults) {
        synchronized (lock) {
            return loadScoresInternal().stream()
                    .sorted(Comparator.comparingInt(ScoreEntry::getScore).reversed())
                    .limit(maxResults)
                    .collect(Collectors.toList());
        }
    }

    // Thread-safe method to get all scores sorted
    public List<ScoreEntry> getAllScoresSorted() {
        synchronized (lock) {
            return loadScoresInternal().stream()
                    .sorted(Comparator.comparingInt(ScoreEntry::getScore).reversed())
                    .collect(Collectors.toList());
        }
    }
}
