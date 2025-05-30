package main.ex3.model;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * A data model representing a player's score entry in the leaderboard.
 *
 * <p>Includes a nickname, score value, and the timestamp of submission.</p>
 *
 * <p>Implements {@link Serializable} for persistence support.</p>
 *
 * @author  Idit Halevi
 * @version 1.0
 * @since   2025-05-30
 */
public class ScoreEntry implements Serializable {
    private static final long serialVersionUID = 1L;

    private String nickname;           // unique player nickname
    private int score;                 // numeric score
    private LocalDateTime timestamp;  // when the score was submitted

    /**
     * Default constructor.
     */
    public ScoreEntry() {
    }

    /**
     * Constructs a new {@code ScoreEntry} with the given nickname, score, and timestamp.
     *
     * @param nickname the player's unique nickname
     * @param score the numeric score
     * @param timestamp the time the score was submitted
     */
    public ScoreEntry(String nickname, int score, LocalDateTime timestamp) {
        setNickname(nickname);
        setScore(score);
        setTimestamp(timestamp);
    }

    /**
     * Returns the player's nickname.
     *
     * @return the nickname
     */
    public String getNickname() {
        return nickname;
    }

    /**
     * Sets the player's nickname.
     *
     * @param nickname the nickname to set
     * @throws IllegalArgumentException if nickname is null or empty
     */
    public void setNickname(String nickname) {
        if (nickname == null || nickname.trim().isEmpty()) {
            throw new IllegalArgumentException("Nickname cannot be empty");
        }
        this.nickname = nickname.trim();
    }

    /**
     * Returns the score.
     *
     * @return the score
     */
    public int getScore() {
        return score;
    }

    /**
     * Sets the score.
     *
     * @param score the score to set
     * @throws IllegalArgumentException if the score is negative
     */
    public void setScore(int score) {
        if (score < 0) {
            throw new IllegalArgumentException("Score must be non-negative");
        }
        this.score = score;
    }

    /**
     * Returns the timestamp of the score submission.
     *
     * @return the timestamp
     */
    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    /**
     * Sets the timestamp of the score submission.
     *
     * @param timestamp the timestamp to set
     * @throws IllegalArgumentException if timestamp is null
     */
    public void setTimestamp(LocalDateTime timestamp) {
        if (timestamp == null) {
            throw new IllegalArgumentException("Timestamp cannot be null");
        }
        this.timestamp = timestamp;
    }

    /**
     * Returns a string representation of the score entry.
     *
     * @return a string describing the score entry
     */
    @Override
    public String toString() {
        return "ScoreEntry{" +
                "nickname='" + nickname + '\'' +
                ", score=" + score +
                ", timestamp=" + timestamp +
                '}';
    }
}
