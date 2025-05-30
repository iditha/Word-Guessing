package main.ex3.model;

import java.io.Serializable;
import java.util.UUID;
import java.util.regex.Pattern;

/**
 * Represents a word entry that belongs to a category and includes a hint.
 * Each entry has a unique ID generated upon creation.
 *
 * <p>Used to model game words for quiz or vocabulary-based applications.</p>
 *
 * <p>Validation rules:</p>
 * <ul>
 *     <li>Category and word must contain only lowercase a–z characters.</li>
 *     <li>Hint must be non-null and non-empty.</li>
 * </ul>
 *
 * Implements {@link Serializable} for persistence support.
 *
 * @author Idit Halevi
 * @version 1.0
 * @since 2025-05-30
 */
public class WordEntry implements Serializable {
    private static final long serialVersionUID = 1L;

    private String id;        // Unique identifier (immutable once set)
    private String category;  // lowercase a-z only
    private String word;      // lowercase a-z only
    private String hint;      // any text, non-null

    // allows uppercase/lowercase letters and spaces
    private static final Pattern VALID_PATTERN = Pattern.compile("^[A-Za-z ]+$");

    /**
     * Default constructor that auto-generates a unique ID.
     */
    public WordEntry() {
        this.id = UUID.randomUUID().toString();
    }

    /**
     * Constructs a new {@code WordEntry} with category, word, and hint.
     *
     * @param category the category name (lowercase a-z)
     * @param word     the actual word (lowercase a-z)
     * @param hint     a hint for the word
     * @throws IllegalArgumentException if inputs are invalid
     */
    public WordEntry(String category, String word, String hint) {
        this(); // sets the id
        setCategory(category);
        setWord(word);
        setHint(hint);
    }

    // ------------------ Getters & Setters ------------------

    /**
     * Returns the unique identifier of this word entry.
     *
     * @return the ID string
     */
    public String getId() {
        return id;
    }

    /**
     * Sets the unique identifier for this word entry.
     * Typically used for deserialization or testing purposes.
     *
     * @param id the ID to assign
     */
    public void setId(String id) {
        if (id == null || id.trim().isEmpty()) {
            throw new IllegalArgumentException("ID must not be null or empty.");
        }
        this.id = id;
    }

    /**
     * Returns the category associated with this word.
     *
     * @return the category name in lowercase
     */
    public String getCategory() {
        return category;
    }

    /**
     * Sets the category of this word.
     * The value must contain only lowercase English letters (a-z).
     *
     * @param category the category to set
     * @throws IllegalArgumentException if null or contains invalid characters
     */
    public void setCategory(String category) {
        if (category == null || category.trim().isEmpty()) {
            throw new IllegalArgumentException("Category must not be empty.");
        }
        String trimmed = category.trim();
        if (!VALID_PATTERN.matcher(trimmed).matches()) {
            throw new IllegalArgumentException("Category must contain only letters and spaces.");
        }
        this.category = trimmed.toLowerCase();
    }

    /**
     * Returns the actual word stored in this entry.
     *
     * @return the word in lowercase
     */
    public String getWord() {
        return word;
    }

    /**
     * Sets the word.
     * The value must contain only lowercase English letters (a-z).
     *
     * @param word the word to set
     * @throws IllegalArgumentException if null or contains invalid characters
     */
    public void setWord(String word) {
        if (word == null || word.trim().isEmpty()) {
            throw new IllegalArgumentException("Word must not be empty.");
        }
        String trimmed = word.trim();
        if (!VALID_PATTERN.matcher(trimmed).matches()) {
            throw new IllegalArgumentException("Word must contain only letters and spaces.");
        }
        this.word = trimmed.toLowerCase();
    }


    /**
     * Returns the hint associated with this word.
     *
     * @return the hint string
     */
    public String getHint() {
        return hint;
    }

    /**
     * Sets a hint for this word.
     * The value must be non-null and not blank.
     *
     * @param hint the hint to assign
     * @throws IllegalArgumentException if null or empty
     */
    public void setHint(String hint) {
        if (hint == null || hint.trim().isEmpty()) {
            throw new IllegalArgumentException("Hint must not be empty.");
        }
        this.hint = hint.trim();
    }

    /**
     * Returns a string representation of the word entry, including id, category, word, and hint.
     *
     * @return a descriptive string
     */
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
