package main.ex3.controller;

import main.ex3.model.WordEntry;
import main.ex3.service.WordService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/words")
public class WordController {

    private final WordService wordService;

    public WordController(WordService wordService) {
        this.wordService = wordService;
    }

    // GET /api/words - Get all words
    @GetMapping
    public ResponseEntity<List<WordEntry>> getAllWords() {
        return ResponseEntity.ok(wordService.getAllWords());
    }

    // GET /api/words/categories - Get all categories
    @GetMapping("/categories")
    public ResponseEntity<Set<String>> getCategories() {
        return ResponseEntity.ok(wordService.getAllCategories());
    }

    // GET /api/words/random?category=xyz - Get random word from category
    @GetMapping("/random")
    public ResponseEntity<?> getRandomWord(@RequestParam String category) {
        try {
            WordEntry word = wordService.getRandomWordByCategory(category);
            return ResponseEntity.ok(word);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No words found in that category.");
        }
    }

    // POST /api/words - Add new word
    @PostMapping
    public ResponseEntity<?> addWord(@RequestBody WordEntry word) {
        try {
            wordService.addWord(word);
            return ResponseEntity.status(HttpStatus.CREATED).body("Word added successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // PUT /api/words/{id} - Update word (by id)
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

    // DELETE /api/words/{id} - Delete word by id
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteWordById(@PathVariable String id) {
        try {
            wordService.deleteWordById(id);
            return ResponseEntity.ok("Word deleted successfully.");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

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
