import Link from "next/link";

export default function ItemGridCell({ id, className="", size = "md" }) {
  return (
    <Link href={`/items/${id}`} passHref>
      <a className={`block cursor-pointer ${className}`}>
        <img
          src={`/images/items/${size == "md" ? 128 : 64}/${id}.webp`}
          style={{
            width: `${size == "md" ? 128 : 64}px`,
            height: `${size == "md" ? 128 : 64}px`,
            minWidth: `${size == "md" ? 128 : 64}px`,
            minHeight: `${size == "md" ? 128 : 64}px`,
          }}
          alt="Item image"
        />
      </a>
    </Link>
  );
}
