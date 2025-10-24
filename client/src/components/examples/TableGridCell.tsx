import TableGridCell from '../TableGridCell';

export default function TableGridCellExample() {
  const table = {
    id: "lungmen",
    name: "Lungmen",
    gridX: 1,
    gridY: 0
  };

  return <TableGridCell table={table} guestCount={5} />;
}
