package main.ex3.initializer;

import main.ex3.model.WordEntry;

import java.io.FileOutputStream;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.List;

public class WordInit {

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
