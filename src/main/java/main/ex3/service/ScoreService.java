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

    // Load scores from file
    private List<ScoreEntry> loadScores() {
        synchronized (lock) {
            File file = new File(SCORE_FILE);
            if (!file.exists()) return new ArrayList<>();
            try (ObjectInputStream in = new ObjectInputStream(new FileInputStream(file))) {
                return (List<ScoreEntry>) in.readObject();
            } catch (Exception e) {
                throw new RuntimeException("Failed to load scores.ser", e);
            }
        }
    }

    // Save scores to file
    private void saveScores(List<ScoreEntry> scores) {
        synchronized (lock) {
            try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream(SCORE_FILE))) {
                out.writeObject(scores);
            } catch (IOException e) {
                throw new RuntimeException("Failed to save scores.ser", e);
            }
        }
    }

    // Add a new score
    public void addScore(ScoreEntry newEntry) {
        List<ScoreEntry> scores = loadScores();
        scores.add(newEntry);
        saveScores(scores);
    }

    // Get top N scores sorted descending
    public List<ScoreEntry> getTopScores(int maxResults) {
        return loadScores().stream()
                .sorted(Comparator.comparingInt(ScoreEntry::getScore).reversed())
                .limit(maxResults)
                .collect(Collectors.toList());
    }

    // Get all scores sorted descending
    public List<ScoreEntry> getAllScoresSorted() {
        return loadScores().stream()
                .sorted(Comparator.comparingInt(ScoreEntry::getScore).reversed())
                .collect(Collectors.toList());
    }
}
