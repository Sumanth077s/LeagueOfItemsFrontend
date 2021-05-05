import formatDistance from "date-fns/formatDistance";

import dataset from "../../../data/dataset.json";

export default function SideNavFooter() {
  return (
    <div className="p-2 pb-0 border-t border-gray-200 text-gray-600 flex flex-col">
      <span className="pb-1">Patch{" "}
        {dataset.version}</span>
      <span>Last update{" "}
        {formatDistance(new Date(dataset.date), new Date(), {
          addSuffix: true,
        })}</span>
    </div>
  );
}
