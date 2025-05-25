package main.ex3.model;

import java.io.Serializable;
import java.time.LocalDateTime;

public class ScoreEntry implements Serializable {
    private static final long serialVersionUID = 1L;

    private String nickname;           // unique player nickname
    private int score;                 // numeric score
    private LocalDateTime timestamp;  // when the score was submitted

    public ScoreEntry() {
    }

    public ScoreEntry(String nickname, int score, LocalDateTime timestamp) {
        setNickname(nickname);
        setScore(score);
        setTimestamp(timestamp);
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        if (nickname == null || nickname.trim().isEmpty()) {
            throw new IllegalArgumentException("Nickname cannot be empty");
        }
        this.nickname = nickname.trim();
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        if (score < 0) {
            throw new IllegalArgumentException("Score must be non-negative");
        }
        this.score = score;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        if (timestamp == null) {
            throw new IllegalArgumentException("Timestamp cannot be null");
        }
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "ScoreEntry{" +
                "nickname='" + nickname + '\'' +
                ", score=" + score +
                ", timestamp=" + timestamp +
                '}';
    }
}
