import Image from "next/image";
import {winrate, winrateClass} from "../../utils/format";
import Card from "../../components/Card";
import {NextSeo} from "next-seo";
import ChampionStats from "../../models/champions/ChampionStats";
import ChampionApi from "../../api/ChampionApi";

export default function ChampionPage({champion}) {
  champion = new ChampionStats(champion);

  return (
    <div className="flex flex-col">
      <NextSeo
        title={champion.name}
        description={`See ${champion.name}'s best items, runes and winrate statistics. Data from U.GG.`}
      />

      <div className="flex mb-4 w-full">
        <div className="w-[256px] h-[256px] mr-4 flex-shrink-0">
          <Image
            className="cursor-pointer champion-image"
            src={`/images/champions/${champion.id}.png`}
            width={256}
            height={256}
            quality={100}
          />
        </div>
        <div className="flex flex-col w-full">
          <h2 className="text-5xl font-header font-medium">{champion.name}</h2>
          <p className="text-lg font-header mb-4 text-gray-600">
            {champion.blurb}
          </p>
          <div className="grid grid-cols-2 gap-3 mb-4 w-1/2">
            <div className="bg-white rounded p-4 text-lg text-center font-bold text-gray-600 shadow">
              <span
                className={`text-gray-900 ${winrateClass(
                  champion.wins,
                  champion.matches
                )}`}
              >
                {winrate(champion.wins, champion.matches)}
              </span>{" "}
              Winrate
            </div>
            <div className="bg-white rounded p-4 text-lg text-center font-bold text-gray-600 shadow">
              <span className="text-gray-900">{champion.matches}</span> Matches
            </div>
            <div className="bg-white rounded p-4 text-lg text-center font-bold text-gray-600 shadow">
              <span className="text-gray-900">{champion.itemStats.length}</span>{" "}
              Items
            </div>
            <div className="bg-white rounded p-4 text-lg text-center font-bold text-gray-600 shadow">
              <span className="text-gray-900">{champion.runeStats.length}</span>{" "}
              Runes
            </div>
          </div>
        </div>
      </div>

      {/* Highest winrate items */}
      <div className="mb-4">
        <h2 className="text-2xl font-header font-medium mb-1">
          Highest winrate items
        </h2>
        <div className="flex space-x-2 w-full overflow-x-auto pb-2">
          {champion.itemStats
            .sort((a, b) => b.wins / b.matches - a.wins / a.matches)
            .map((itemStats, i) => (
              <Card key={i} type={"item"} {...itemStats} id={itemStats.itemId}/>
            ))}
        </div>
      </div>

      {/* Highest winrate runes */}
      <div>
        <h2 className="text-2xl font-header font-medium mb-1">
          Highest winrate runes
        </h2>
        <div className="flex space-x-2 w-full overflow-x-auto pb-2">
          {champion.runeStats
            .sort((a, b) => b.wins / b.matches - a.wins / a.matches)
            .map((runeStats, i) => (
              <Card key={i} type={"rune"} {...runeStats} id={runeStats.runeId}/>
            ))}
        </div>
      </div>

      {/*/!* Winrate by order *!/*/}
      {/*<div className="mt-4">*/}
      {/*  <h2 className="text-2xl font-header font-medium mb-1">*/}
      {/*    Stats by order*/}
      {/*  </h2>*/}
      {/*  <div*/}
      {/*    className="grid grid-cols-5 grid-flow-col gap-2"*/}
      {/*    style={{gridTemplateRows: "auto auto"}}*/}
      {/*  >*/}
      {/*    {champion.orderStats.map((stats) => (*/}
      {/*      <ItemStatsByOrder key={Math.random()} orderStats={stats}/>*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
}

export async function getStaticPaths() {
  const champions = await ChampionApi.getAllChampions();

  return {
    paths: champions.map((i) => ({params: {id: "" + i.id}})),
    fallback: false,
  };
}

export async function getStaticProps({params}) {
  const champion = await ChampionApi.getChampion(params.id);

  return {
    props: {
      champion,
    },
  };
}

ChampionPage.pageName = ({champion}) => champion.name;
