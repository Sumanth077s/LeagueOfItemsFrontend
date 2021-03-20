import Image from "next/image";
import ChampionIcon from "../../components/ChampionIcon";
import ItemApi from "../../api/ItemApi";
import ItemStats from "../../models/ItemStats";
import { winrate, winrateClass } from "../../utils/format";

export default function ItemPage({ item }) {
  item = new ItemStats(item);

  return (
    <div className="flex flex-col">
      <div className="flex mb-4">
        <div className="w-[256px] h-[256px] mr-4">
          <Image
            className="cursor-pointer"
            src={`/images/items/${item.id}.png`}
            width={256}
            height={256}
            quality={100}
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-5xl font-header font-medium">{item.name}</h2>
          <p className="text-lg font-header mb-4 text-gray-600">
            {item.plaintext}
          </p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white rounded p-4 text-lg text-center font-bold text-gray-600 shadow">
              Winrate:{" "}
              <span
                className={`text-gray-900 ${winrateClass(
                  item.wins,
                  item.matches
                )}`}
              >
                {winrate(item.wins, item.matches)}
              </span>
            </div>
            <div className="bg-white rounded p-4 text-lg text-center font-bold text-gray-600 shadow">
              Matches: <span className="text-gray-900">{item.matches}</span>
            </div>
            <div className="bg-white rounded p-4 text-lg text-center font-bold text-gray-600 shadow">
              Champions:{" "}
              <span className="text-gray-900">{item.championStats.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex">
          <div className="flex flex-col w-full">
            <h2 className="text-2xl font-header font-medium mb-1">
              Highest winrate champions
            </h2>
            <div className="flex space-x-2 w-full overflow-x-auto pb-2">
              {item.championStats
                .sort((a, b) => b.wins / b.matches - a.wins / a.matches)
                .map(({ championId, wins, matches }) => (
                  <div
                    className="px-3 py-3 bg-white rounded text-center shadow"
                    key={championId}
                  >
                    {/*<h3 className="font-header mb-1">{championId}</h3>*/}
                    <ChampionIcon id={championId} />
                    <p
                      className={`text-center font-bold text-lg ${winrateClass(
                        wins,
                        matches
                      )}`}
                    >
                      {winrate(wins, matches)}
                    </p>
                    <p className="text-center font-bold text-lg">{matches}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const items = await ItemApi.getAllItems();

  return {
    paths: items.map((i) => ({ params: { id: "" + i.id } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const item = await ItemApi.getItem(params.id);

  return {
    props: {
      item,
    },
  };
}

ItemPage.pageName = "ItemStats";
