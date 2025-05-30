package main.ex3.controller;

import main.ex3.model.WordEntry;
import main.ex3.service.WordService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * REST controller for managing words and categories in the system.
 *
 * <p>Provides endpoints to retrieve, add, update, and delete word entries, as well as
 * fetch words by category or retrieve a random word.</p>
 *
 * @author Idit Halevi
 * @version 1.0
 * @since   2025-05-30
 */
@RestController
@RequestMapping("/api/words")
public class WordController {

    private final WordService wordService;

    /**
     * Constructs a new {@code WordController} with the given {@link WordService}.
     *
     * @param wordService the service responsible for word-related operations
     */
    public WordController(WordService wordService) {
        this.wordService = wordService;
    }

    /**
     * Retrieves all word entries.
     *
     * <p>Handles HTTP GET requests to {@code /api/words}.</p>
     *
     * @return a {@link ResponseEntity} containing the list of all {@link WordEntry} objects
     */
    @GetMapping
    public ResponseEntity<List<WordEntry>> getAllWords() {
        return ResponseEntity.ok(wordService.getAllWords());
    }

    /**
     * Retrieves all unique word categories.
     *
     * <p>Handles HTTP GET requests to {@code /api/words/categories}.</p>
     *
     * @return a {@link ResponseEntity} containing a set of category names
     */
    @GetMapping("/categories")
    public ResponseEntity<Set<String>> getCategories() {
        return ResponseEntity.ok(wordService.getAllCategories());
    }

    /**
     * Retrieves a random word from the specified category.
     *
     * <p>Handles HTTP GET requests to {@code /api/words/random?category=xyz}.</p>
     *
     * @param category the name of the category to fetch a word from
     * @return a {@link ResponseEntity} containing a random {@link WordEntry},
     *         or 404 if no words are found in the category
     */
    @GetMapping("/random")
    public ResponseEntity<?> getRandomWord(@RequestParam String category) {
        try {
            WordEntry word = wordService.getRandomWordByCategory(category);
            return ResponseEntity.ok(word);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No words found in that category.");
        }
    }

    /**
     * Adds a new word entry.
     *
     * <p>Handles HTTP POST requests to {@code /api/words}.</p>
     *
     * @param word the {@link WordEntry} to add
     * @return a {@link ResponseEntity} with a success or error message
     */
    @PostMapping
    public ResponseEntity<?> addWord(@RequestBody WordEntry word) {
        try {
            wordService.addWord(word);
            return ResponseEntity.status(HttpStatus.CREATED).body("Word added successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    /**
     * Updates an existing word entry by its ID.
     *
     * <p>Handles HTTP PUT requests to {@code /api/words/{id}}.</p>
     *
     * @param id the ID of the word to update
     * @param updated the updated {@link WordEntry} object
     * @return a {@link ResponseEntity} with the result of the operation
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateWordById(@PathVariable String id, @RequestBody WordEntry updated) {
        try {
            wordService.updateWordById(id, updated);
            return ResponseEntity.ok("Word updated successfully.");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    /**
     * Deletes a word entry by its ID.
     *
     * <p>Handles HTTP DELETE requests to {@code /api/words/{id}}.</p>
     *
     * @param id the ID of the word to delete
     * @return a {@link ResponseEntity} with the result of the deletion
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteWordById(@PathVariable String id) {
        try {
            wordService.deleteWordById(id);
            return ResponseEntity.ok("Word deleted successfully.");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    /**
     * Retrieves a word entry by its ID.
     *
     * <p>Handles HTTP GET requests to {@code /api/words/{id}}.</p>
     *
     * @param id the ID of the word to retrieve
     * @return a {@link ResponseEntity} containing the {@link WordEntry}, or 404 if not found
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getWordById(@PathVariable String id) {
        Optional<WordEntry> wordOpt = wordService.getWordById(id);
        if (wordOpt.isPresent()) {
            return ResponseEntity.ok(wordOpt.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Word not found.");
        }
    }

}
