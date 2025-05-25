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

    // PUT /api/words/{word} - Update word (by word string + category)
    @PutMapping("/{word}")
    public ResponseEntity<?> updateWord(@PathVariable String word, @RequestBody WordEntry updated) {
        try {
            wordService.updateWord(word, updated);
            return ResponseEntity.ok("Word updated successfully.");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // DELETE /api/words/{word}?category=xyz - Delete word from category
    @DeleteMapping("/{word}")
    public ResponseEntity<?> deleteWord(@PathVariable String word, @RequestParam String category) {
        try {
            wordService.deleteWord(word, category);
            return ResponseEntity.ok("Word deleted successfully.");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
