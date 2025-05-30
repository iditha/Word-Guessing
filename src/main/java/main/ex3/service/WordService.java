package main.ex3.service;

import main.ex3.model.WordEntry;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Service layer for managing {@link WordEntry} instances.
 * Provides thread-safe CRUD operations backed by serialization to a local file.
 *
 * <p>Words are persisted in a file named {@code words.ser}.
 * All operations are synchronized to ensure thread safety.</p>
 *
 * @author Idit Halevi
 * @version 1.0
 * @since 2025-05-30
 */
@Service
public class WordService {
    private final String WORDS_FILE = "words.ser";
    private final Object lock = new Object();

    /**
     * Loads all word entries from the serialized file.
     *
     * @return list of all {@link WordEntry} objects
     * @throws RuntimeException if the file cannot be read
     */
    private List<WordEntry> loadWordsInternal() {
        File file = new File(WORDS_FILE);
        if (!file.exists()) return new ArrayList<>();
        try (ObjectInputStream in = new ObjectInputStream(new FileInputStream(file))) {
            return (List<WordEntry>) in.readObject();
        } catch (Exception e) {
            throw new RuntimeException("Failed to read words.ser", e);
        }
    }

    /**
     * Saves the provided list of word entries to the serialized file.
     *
     * @param words the list of {@link WordEntry} objects to save
     * @throws RuntimeException if the file cannot be written
     */
    private void saveWordsInternal(List<WordEntry> words) {
        try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream(WORDS_FILE))) {
            out.writeObject(words);
        } catch (IOException e) {
            throw new RuntimeException("Failed to save words.ser", e);
        }
    }

    /**
     * Retrieves all word entries from storage.
     *
     * @return a list of all words
     */
    public List<WordEntry> getAllWords() {
        synchronized (lock) {
            return new ArrayList<>(loadWordsInternal());
        }
    }

    /**
     * Returns a set of all unique categories from the stored word entries.
     *
     * @return a set of category names
     */
    public Set<String> getAllCategories() {
        synchronized (lock) {
            return loadWordsInternal().stream()
                    .map(WordEntry::getCategory)
                    .collect(Collectors.toSet());
        }
    }

    /**
     * Adds a new word entry if it does not already exist.
     *
     * @param newWord the word to add
     * @throws IllegalArgumentException if validation fails or word already exists
     */
    public void addWord(WordEntry newWord) {
        synchronized (lock) {
            validateWordEntry(newWord);

            List<WordEntry> words = loadWordsInternal();
            if (wordExists(words, newWord.getWord(), null)) {
                throw new IllegalArgumentException("Word already exists.");
            }

            if (newWord.getId() == null || newWord.getId().isEmpty()) {
                newWord.setId(UUID.randomUUID().toString());
            }

            words.add(newWord);
            saveWordsInternal(words);
        }
    }

    /**
     * Updates an existing word entry by its ID.
     *
     * @param id      the ID of the word to update
     * @param updated the updated word data
     * @throws IllegalArgumentException if validation fails or ID mismatch
     * @throws NoSuchElementException   if the word ID is not found
     */
    public void updateWordById(String id, WordEntry updated) {
        synchronized (lock) {
            if (!updated.getId().equals(id)) {
                throw new IllegalArgumentException("ID in path and body must match.");
            }

            validateWordEntry(updated);

            List<WordEntry> words = loadWordsInternal();
            if (wordExists(words, updated.getWord(), id)) {
                throw new IllegalArgumentException("Word already exists.");
            }

            boolean updatedFlag = false;
            for (int i = 0; i < words.size(); i++) {
                if (words.get(i).getId().equals(id)) {
                    words.set(i, updated);
                    updatedFlag = true;
                    break;
                }
            }

            if (!updatedFlag) throw new NoSuchElementException("Word not found to update.");
            saveWordsInternal(words);
        }
    }

    /**
     * Validates a {@link WordEntry} for required fields and allowed formats.
     *
     * @param entry the entry to validate
     * @throws IllegalArgumentException if validation fails
     */
    private void validateWordEntry(WordEntry entry) {
        if (entry == null) {
            throw new IllegalArgumentException("Word entry cannot be null.");
        }

        if (entry.getWord() == null || !entry.getWord().matches("[a-zA-Z]+")) {
            throw new IllegalArgumentException("Word must contain only letters (A–Z, a–z) and must not be empty.");
        }

        if (entry.getCategory() == null || !entry.getCategory().matches("[a-zA-Z]+")) {
            throw new IllegalArgumentException("Category must contain only letters (A–Z, a–z) and must not be empty.");
        }

        if (entry.getHint() == null || entry.getHint().trim().isEmpty()) {
            throw new IllegalArgumentException("Hint must not be empty.");
        }
    }

    /**
     * Deletes a word entry by its ID.
     *
     * @param id the ID of the word to delete
     * @throws NoSuchElementException if the ID is not found
     */
    public void deleteWordById(String id) {
        synchronized (lock) {
            List<WordEntry> words = loadWordsInternal();
            boolean removed = words.removeIf(w -> w.getId().equals(id));
            if (!removed) throw new NoSuchElementException("Word not found for deletion.");
            saveWordsInternal(words);
        }
    }

    /**
     * Returns a random word from the specified category.
     *
     * @param category the name of the category
     * @return a randomly selected {@link WordEntry}
     * @throws NoSuchElementException if no word exists for the category
     */
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

    /**
     * Retrieves a word entry by its ID.
     *
     * @param id the ID to look up
     * @return an {@link Optional} containing the word if found, or empty otherwise
     */
    public Optional<WordEntry> getWordById(String id) {
        synchronized (lock) {
            return loadWordsInternal().stream()
                    .filter(w -> w.getId().equals(id))
                    .findFirst();
        }
    }

    /**
     * Checks whether a word already exists (case-insensitive).
     *
     * @param words     the list of all existing words
     * @param word      the word to check
     * @param excludeId optional ID to exclude from matching (useful when updating)
     * @return {@code true} if the word exists, {@code false} otherwise
     */
    private boolean wordExists(List<WordEntry> words, String word, String excludeId) {
        return words.stream().anyMatch(w ->
                w.getWord().equalsIgnoreCase(word) &&
                        (excludeId == null || !w.getId().equals(excludeId))
        );
    }

}
