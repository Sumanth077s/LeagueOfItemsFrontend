import { pickrate, winrate, winrateClass } from "../utils/format";
import HelpHover from "./HelpHover";
import { CHAMPION_PICKRATE_HELPER_TEXT } from "../constants/constants";

export default function StatsCard({
  wins = null,
  matches = null,
  previousWins = null,
  previousMatches = null,
  totalMatches = null,
  previousTotalMatches = null,
  type = "winrate",
  entityType = "champion",
}) {
  const isWinrate = type === "winrate";
  const isChampion = entityType === "champion";

  return (
    <div className="flex-col items-center justify-center bg-white rounded p-4 text-lg font-bold text-gray-600 shadow dark:text-gray-400 dark:bg-gray-800">
      <div className="flex justify-center">
        {isWinrate && (
          <>
            <span className={`${winrateClass(wins, matches)} mr-1`}>
              {winrate(wins, matches)}
            </span>
            <span>Winrate</span>
          </>
        )}
        {!isWinrate && (
          <>
            <span className="text-gray-900 dark:text-white mr-1">
              {pickrate(matches, totalMatches)}
            </span>{" "}
            Pickrate
            {isChampion && <HelpHover text={CHAMPION_PICKRATE_HELPER_TEXT} />}
          </>
        )}
      </div>
      {isWinrate && previousMatches != null && previousWins != null && (
        <div className="flex justify-center text-xs">
          <span className="text-gray-500 mr-1">
            {winrate(previousWins, previousMatches)}
          </span>
          <span className="text-gray-500">Last patch</span>
        </div>
      )}
      {!isWinrate && previousMatches != null && previousTotalMatches != null && (
        <div className="flex justify-center text-xs">
          <span className="text-gray-500 mr-1">
            {pickrate(previousMatches, previousTotalMatches)}
          </span>
          <span className="text-gray-500">Last patch</span>
        </div>
      )}
    </div>
  );
}
