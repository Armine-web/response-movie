import { useLocalStorageState } from "../../hooks/use-local-storage-state";
import { Table } from "../../components/table/table";

export const Movies = () => {
  const [moviesState] = useLocalStorageState([], "movies");

  return (
    <div className="container mt-4">
      <h1 style={{color: "#EC8305", textAlign: "center"}}>My Movies</h1>
      <Table data={moviesState} onRowClick={() => {}} />
    </div>
  );
};