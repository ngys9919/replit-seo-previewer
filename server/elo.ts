/**
 * Calculate expected score for a player in ELO system
 * @param rating Player's current rating
 * @param opponentRating Opponent's current rating
 * @returns Expected score (0-1)
 */
function getExpectedScore(rating: number, opponentRating: number): number {
  return 1 / (1 + Math.pow(10, (opponentRating - rating) / 400));
}

/**
 * Calculate new ELO ratings after a match
 * @param winnerRating Current rating of the winner
 * @param loserRating Current rating of the loser
 * @param kFactor K-factor (sensitivity of rating changes, default 32)
 * @returns Object with new ratings for winner and loser
 */
export function calculateNewRatings(
  winnerRating: number,
  loserRating: number,
  kFactor: number = 32
): { newWinnerRating: number; newLoserRating: number } {
  const expectedWinner = getExpectedScore(winnerRating, loserRating);
  const expectedLoser = getExpectedScore(loserRating, winnerRating);

  const newWinnerRating = Math.round(winnerRating + kFactor * (1 - expectedWinner));
  const newLoserRating = Math.round(loserRating + kFactor * (0 - expectedLoser));

  return {
    newWinnerRating,
    newLoserRating,
  };
}
