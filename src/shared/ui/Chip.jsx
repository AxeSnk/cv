export function Chip({children}) {
  return <span className="chip">{children}</span>;
}

/** chips: массив строк */
export function ChipRow({items}) {
  return (
    <p className="stack">
      {items.map((s) => (
        <Chip key={s}>{s}</Chip>
      ))}
    </p>
  );
}
