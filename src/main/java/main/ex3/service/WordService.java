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
    private List<WordEntry> loadWords() {
        synchronized (lock) {
            File file = new File(WORDS_FILE);
            if (!file.exists()) return new ArrayList<>();
            try (ObjectInputStream in = new ObjectInputStream(new FileInputStream(file))) {
                return (List<WordEntry>) in.readObject();
            } catch (Exception e) {
                throw new RuntimeException("Failed to read words.ser", e);
            }
        }
    }

    // Save words to file
    private void saveWords(List<WordEntry> words) {
        synchronized (lock) {
            try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream(WORDS_FILE))) {
                out.writeObject(words);
            } catch (IOException e) {
                throw new RuntimeException("Failed to save words.ser", e);
            }
        }
    }

    // Get all words
    public List<WordEntry> getAllWords() {
        return loadWords();
    }

    // Get all categories (unique)
    public Set<String> getAllCategories() {
        return loadWords().stream()
                .map(WordEntry::getCategory)
                .collect(Collectors.toSet());
    }

    // Add new word
    public void addWord(WordEntry newWord) {
        List<WordEntry> words = loadWords();
        boolean exists = words.stream().anyMatch(w ->
                w.getWord().equalsIgnoreCase(newWord.getWord()) &&
                        w.getCategory().equalsIgnoreCase(newWord.getCategory()));
        if (exists) throw new IllegalArgumentException("Word already exists in this category.");
        words.add(newWord);
        saveWords(words);
    }

    // Update an existing word (by matching word string & category)
    public void updateWord(String oldWord, WordEntry updated) {
        List<WordEntry> words = loadWords();
        boolean updatedFlag = false;
        for (int i = 0; i < words.size(); i++) {
            WordEntry w = words.get(i);
            if (w.getWord().equalsIgnoreCase(oldWord) &&
                    w.getCategory().equalsIgnoreCase(updated.getCategory())) {
                words.set(i, updated);
                updatedFlag = true;
                break;
            }
        }
        if (!updatedFlag) throw new NoSuchElementException("Word not found to update.");
        saveWords(words);
    }

    // Delete a word
    public void deleteWord(String word, String category) {
        List<WordEntry> words = loadWords();
        boolean removed = words.removeIf(w ->
                w.getWord().equalsIgnoreCase(word) &&
                        w.getCategory().equalsIgnoreCase(category));
        if (!removed) throw new NoSuchElementException("Word not found for deletion.");
        saveWords(words);
    }

    // Get random word by category
    public WordEntry getRandomWordByCategory(String category) {
        List<WordEntry> matching = loadWords().stream()
                .filter(w -> w.getCategory().equalsIgnoreCase(category))
                .collect(Collectors.toList());

        if (matching.isEmpty()) throw new NoSuchElementException("No words found in this category.");

        Collections.shuffle(matching);
        return matching.get(0);
    }
}
