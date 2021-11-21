import RuneApi from "../../api/RuneApi";
import RuneGridCell from "../../components/runes/RuneGridCell";
import { useMemo } from "react";
import RuneStats from "../../models/runes/RuneStats";
import { NextSeo } from "next-seo";

export default function RuneIndex({ runes }) {
  const { keystones, normalRunes } = useMemo(() => {
    runes = runes.map((i) => new RuneStats(i));

    const keystones = runes.filter((i) => i.isKeystone());
    const normalRunes = runes.filter((i) => !i.isKeystone());

    return { keystones, normalRunes };
  }, [runes]);

  return (
    <div>
      <NextSeo
        title="Runes"
        description="See all League of Legends runes and what champions they are best used on."
      />

      <h2 className="font-header text-4xl mb-2">Keystones</h2>
      <div className="flex flex-wrap">
        {keystones.map((i) => (
          <RuneGridCell {...i} key={i.id} />
        ))}
      </div>

      <h2 className="font-header text-4xl mb-2">Runes</h2>
      <div className="flex flex-wrap">
        {normalRunes.map((i) => (
          <RuneGridCell {...i} key={i.id} size="sm" />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const runes = RuneApi.getAllRunes();

  return {
    props: {
      runes,
    },
  };
}

RuneIndex.pageName = "Runes";
