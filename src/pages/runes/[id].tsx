import {
  pickrate,
  removeTags,
  winrate,
  winrateClass,
} from "../../utils/format";
import RuneApi from "../../api/RuneApi";
import RuneStats from "../../models/runes/RuneStats";
import Card from "../../components/Card";
import { NextSeo } from "next-seo";
import PageHeader from "../../components/PageHeader";
import MatchApi from "../../api/MatchApi";
import usePageView from "../../hooks/usePageView";
import ChampionApi from "../../api/ChampionApi";
import StatsCard from "../../components/StatsCard";

export default function RunePage({
  rune,
  totalMatches,
  previousTotalMatches,
  matchesByChampion,
}) {
  rune = new RuneStats(rune);

  usePageView("RUNE", rune.id);

  return (
    <div className="flex flex-col">
      <NextSeo
        title={rune.name}
        description={`See ${rune.name}'s best champions and winrate statistics. Data from U.GG.`}
      />

      <PageHeader
        type="rune"
        id={rune.id}
        name={rune.name}
        description={removeTags(rune.shortDescription)}
      >
        <div className="grid grid-cols-2 gap-3 mb-4 xl:w-1/2">
          <StatsCard {...rune} entityType="rune" />
          <StatsCard
            {...rune}
            totalMatches={totalMatches}
            previousTotalMatches={previousTotalMatches}
            entityType="rune"
            type="pickrate"
          />

          <div className="bg-white rounded p-4 text-lg text-center font-bold text-gray-600 shadow dark:text-gray-300 dark:bg-gray-800">
            <span className="text-gray-900 dark:text-white">
              {rune.championStats.length}
            </span>{" "}
            Champions
          </div>
        </div>
      </PageHeader>

      {/* Highest winrate champions */}
      <div>
        <h2 className="text-2xl font-header font-medium mb-1">
          Highest winrate champions
        </h2>
        <div className="flex space-x-2 w-full overflow-x-auto pb-2">
          {rune.championStats
            .sort((a, b) => b.wins / b.matches - a.wins / a.matches)
            .map((championStats) => (
              <Card
                key={championStats.championId}
                type={"champion"}
                {...championStats}
                totalMatches={matchesByChampion[championStats.championId]}
                id={championStats.championId}
              />
            ))}
        </div>
      </div>

      {/* Highest pickrate champions */}
      <div>
        <h2 className="text-2xl font-header font-medium mb-1 mt-4">
          Highest pickrate champions
        </h2>
        <div className="flex space-x-2 w-full overflow-x-auto pb-2">
          {rune.championStats
            .sort(
              (a, b) =>
                b.matches / matchesByChampion[b.championId] -
                a.matches / matchesByChampion[a.championId]
            )
            .map((championStats) => (
              <Card
                key={championStats.championId}
                type={"champion"}
                {...championStats}
                totalMatches={matchesByChampion[championStats.championId]}
                id={championStats.championId}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const runes = RuneApi.getAllRunes();

  return {
    paths: runes.map((r) => ({ params: { id: r.id.toString() } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const rune = RuneApi.getRune(params.id);

  const totalMatches = MatchApi.getTotalMatches();
  const previousTotalMatches = MatchApi.getPreviousTotalMatches();

  const matchesByChampion = ChampionApi.getMatchesByChampion();

  return {
    props: {
      rune,
      totalMatches,
      previousTotalMatches,
      matchesByChampion,
    },
  };
}

RunePage.pageName = ({ rune }) => rune.name;
RunePage.favouriteType = () => "RUNE";
RunePage.favouriteId = ({ rune }) => rune.id;
