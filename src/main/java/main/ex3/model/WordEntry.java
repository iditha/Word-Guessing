package main.ex3.model;

import java.io.Serializable;
import java.util.regex.Pattern;

public class WordEntry implements Serializable {
    private static final long serialVersionUID = 1L;

    private String category; // lowercase a-z only
    private String word;     // lowercase a-z only
    private String hint;     // any text, non-null

    private static final Pattern VALID_PATTERN = Pattern.compile("^[a-z]+$");

    public WordEntry() {
    }

    public WordEntry(String category, String word, String hint) {
        setCategory(category);
        setWord(word);
        setHint(hint);
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
                "category='" + category + '\'' +
                ", word='" + word + '\'' +
                ", hint='" + hint + '\'' +
                '}';
    }
}
