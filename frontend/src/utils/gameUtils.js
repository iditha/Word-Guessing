export function calculateScore(state) {
    const timePenalty = Math.floor(state.timeElapsed / 5);
    const hintPenalty = state.hintUsed ? 10 : 0;
    return Math.max(0, 100 - timePenalty - hintPenalty + (state.attemptsLeft * 5));
}
