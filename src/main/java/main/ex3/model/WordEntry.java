package main.ex3.model;

import java.io.Serializable;
import java.util.UUID;
import java.util.regex.Pattern;

public class WordEntry implements Serializable {
    private static final long serialVersionUID = 1L;

    private String id;        // Unique identifier (immutable once set)
    private String category;  // lowercase a-z only
    private String word;      // lowercase a-z only
    private String hint;      // any text, non-null

    private static final Pattern VALID_PATTERN = Pattern.compile("^[a-z]+$");

    public WordEntry() {
        this.id = UUID.randomUUID().toString();
    }

    public WordEntry(String category, String word, String hint) {
        this(); // sets the id
        setCategory(category);
        setWord(word);
        setHint(hint);
    }

    // ------------------ Getters & Setters ------------------

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        if (category == null || !VALID_PATTERN.matcher(category.toLowerCase()).matches()) {
            throw new IllegalArgumentException("Category must contain only a-z letters");
        }
        this.category = category.toLowerCase();
    }

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        if (word == null || !VALID_PATTERN.matcher(word.toLowerCase()).matches()) {
            throw new IllegalArgumentException("Word must contain only a-z letters");
        }
        this.word = word.toLowerCase();
    }

    public String getHint() {
        return hint;
    }

    public void setHint(String hint) {
        if (hint == null || hint.trim().isEmpty()) {
            throw new IllegalArgumentException("Hint must not be empty");
        }
        this.hint = hint;
    }

    @Override
    public String toString() {
        return "WordEntry{" +
                "id='" + id + '\'' +
                ", category='" + category + '\'' +
                ", word='" + word + '\'' +
                ", hint='" + hint + '\'' +
                '}';
    }
}
