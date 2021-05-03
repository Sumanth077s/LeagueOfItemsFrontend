import Image from "next/image";
import Link from "next/link";

export default function RuneGridCell({ id, size = "md" }) {
  return (
    <Link href={`/runes/${id}`} passHref>
      <a className="block mr-[6px]">
        <Image
          className="cursor-pointer"
          src={`/images/runes/${id}.png`}
          width={size == "md" ? 128 : 64}
          height={size == "md" ? 128 : 64}
        />
      </a>
    </Link>
  );
}
