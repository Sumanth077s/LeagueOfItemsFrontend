export const getPlayrateIncrease = (build) =>
  build.playRate - build.previousPlayRate;

export const getPlayrateIncreasePercentage = (build) =>
  build.playRate / build.previousPlayRate;

export const getWinrateIncrease = (s) =>
  s.wins / s.matches - s.previousWins / s.previousMatches;
