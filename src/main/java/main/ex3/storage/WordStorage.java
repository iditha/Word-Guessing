package main.ex3.storage;

import main.ex3.model.WordEntry;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class WordStorage {
    private static final String FILE_NAME = "words.ser";
    private final Object lock = new Object();

    public List<WordEntry> loadWords() {
        synchronized (lock) {
            File file = new File(FILE_NAME);
            if (!file.exists()) return new ArrayList<>();
            try (ObjectInputStream in = new ObjectInputStream(new FileInputStream(file))) {
                return (List<WordEntry>) in.readObject();
            } catch (IOException | ClassNotFoundException e) {
                e.printStackTrace();
                return new ArrayList<>();
            }
        }
    }

    public void saveWords(List<WordEntry> words) {
        synchronized (lock) {
            try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream(FILE_NAME))) {
                out.writeObject(words);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
