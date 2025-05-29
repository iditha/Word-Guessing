package main.ex3.service;

import main.ex3.model.WordEntry;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class WordService {
    private final String WORDS_FILE = "words.ser";
    private final Object lock = new Object();

    // Load words from file
    private List<WordEntry> loadWordsInternal() {
        File file = new File(WORDS_FILE);
        if (!file.exists()) return new ArrayList<>();
        try (ObjectInputStream in = new ObjectInputStream(new FileInputStream(file))) {
            return (List<WordEntry>) in.readObject();
        } catch (Exception e) {
            throw new RuntimeException("Failed to read words.ser", e);
        }
    }

    // Save words to file
    private void saveWordsInternal(List<WordEntry> words) {
        try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream(WORDS_FILE))) {
            out.writeObject(words);
        } catch (IOException e) {
            throw new RuntimeException("Failed to save words.ser", e);
        }
    }

    public List<WordEntry> getAllWords() {
        synchronized (lock) {
            return new ArrayList<>(loadWordsInternal());
        }
    }

    public Set<String> getAllCategories() {
        synchronized (lock) {
            return loadWordsInternal().stream()
                    .map(WordEntry::getCategory)
                    .collect(Collectors.toSet());
        }
    }

    public void addWord(WordEntry newWord) {
        synchronized (lock) {
            List<WordEntry> words = loadWordsInternal();
            boolean exists = words.stream().anyMatch(w ->
                    w.getWord().equalsIgnoreCase(newWord.getWord()));
            if (exists) throw new IllegalArgumentException("Word already exists.");

            if (newWord.getId() == null || newWord.getId().isEmpty()) {
                newWord.setId(UUID.randomUUID().toString());
            }

            words.add(newWord);
            saveWordsInternal(words);
        }
    }

    public void updateWordById(String id, WordEntry updated) {
        synchronized (lock) {
            if (!updated.getId().equals(id)) {
                throw new IllegalArgumentException("ID in path and body must match.");
            }

            List<WordEntry> words = loadWordsInternal();
            boolean updatedFlag = false;

            System.out.println("Trying to update ID: " + id);
            words.forEach(w -> System.out.println("Existing ID: " + w.getId()));

            for (int i = 0; i < words.size(); i++) {
                WordEntry w = words.get(i);
                if (w.getId().equals(id)) {
                    words.set(i, updated);
                    updatedFlag = true;
                    break;
                }
            }

            if (!updatedFlag) throw new NoSuchElementException("Word not found to update.");
            saveWordsInternal(words);
        }
    }

    public void deleteWordById(String id) {
        synchronized (lock) {
            List<WordEntry> words = loadWordsInternal();
            boolean removed = words.removeIf(w -> w.getId().equals(id));
            if (!removed) throw new NoSuchElementException("Word not found for deletion.");
            saveWordsInternal(words);
        }
    }

    public WordEntry getRandomWordByCategory(String category) {
        synchronized (lock) {
            List<WordEntry> matching = loadWordsInternal().stream()
                    .filter(w -> w.getCategory().equalsIgnoreCase(category))
                    .collect(Collectors.toList());

            if (matching.isEmpty()) throw new NoSuchElementException("No words found in this category.");

            Collections.shuffle(matching);
            return matching.get(0);
        }
    }

    public Optional<WordEntry> getWordById(String id) {
        synchronized (lock) {
            return loadWordsInternal().stream()
                    .filter(w -> w.getId().equals(id))
                    .findFirst();
        }
    }
}
