package main.ex3.initializer;

import main.ex3.model.WordEntry;

import java.io.FileOutputStream;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * Initializes a list of predefined {@link WordEntry} objects and serializes them to a file.
 *
 * <p>The serialized file is named {@code words.ser} and can be used to prepopulate
 * the application's word repository.</p>
 *
 * <p>Each word has a category, term, and hint description.</p>
 *
 * @author  Idit Halevi
 * @version 1.0
 * @since   2025-05-30
 */
public class WordInit {

    /**
     * Entry point of the word initializer.
     *
     * <p>Creates a list of sample {@link WordEntry} objects, then serializes the list
     * to a file called {@code words.ser}.</p>
     *
     * @param args command-line arguments (not used)
     */
    public static void main(String[] args) {
        List<WordEntry> words = new ArrayList<>();

        words.add(new WordEntry("animals", "tiger", "A big striped cat"));
        words.add(new WordEntry("animals", "zebra", "Black and white stripes"));
        words.add(new WordEntry("fruits", "banana", "Yellow and curved"));
        words.add(new WordEntry("fruits", "orange", "Round and juicy"));
        words.add(new WordEntry("colors", "purple", "Mix of red and blue"));
        words.add(new WordEntry("colors", "green", "Color of grass"));
        words.add(new WordEntry("jobs", "doctor", "Works in a hospital"));
        words.add(new WordEntry("jobs", "pilot", "Flies an airplane"));
        words.add(new WordEntry("cities", "london", "Capital of the UK"));
        words.add(new WordEntry("cities", "paris", "City of love"));

        try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream("words.ser"))) {
            out.writeObject(words);
            System.out.println("words.ser created successfully with " + words.size() + " entries.");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
