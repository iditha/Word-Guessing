/**
 * Calculates the player's score based on the current game state.
 *
 * Scoring rules:
 * - Start with 100 points.
 * - Subtract 1 point for every 5 seconds passed (`timeElapsed`).
 * - Subtract 10 points if a hint was used.
 * - Add 5 points for each remaining attempt.
 * - Score is clamped at a minimum of 0.
 *
 * @param {Object} state - Game state object.
 * @param {number} state.timeElapsed - Time passed in seconds.
 * @param {boolean} state.hintUsed - Whether a hint was used.
 * @param {number} state.attemptsLeft - Number of guesses left.
 * @returns {number} The final calculated score (minimum 0).
 */
export function calculateScore(state) {
    const timePenalty = Math.floor(state.timeElapsed / 5);
    const hintPenalty = state.hintUsed ? 10 : 0;
    return Math.max(0, 100 - timePenalty - hintPenalty + (state.attemptsLeft * 5));
}
