import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  TablePagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//renders the dashboard table under the dashboard map
const DashboardTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { animals } = useSelector((state) => state.animal);

  //sets headers for table
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "animalId", headerName: "Animal Id", flex: 1 },
    { field: "breed", headerName: "Animal Breed", flex: 1 },
    { field: "color", headerName: "Color", flex: 1 },
    { field: "age", headerName: "Age", flex: 1 },
  ];

  //sets number of rows in table to limit of 10
  useEffect(() => {
    setRowsPerPage(10);
  }, []);

  //handles page change when more than 10 animals are in the table
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  //renders table on dashboard
  return (
    <div className="table">
      <TableContainer size="small">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {columns.map((col) => {
                return (
                  <TableCell
                    variant="head"
                    key={col.headerName}
                    className="headers"
                  >
                    {col.headerName}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {animals &&
              animals.animals.map((animal) => (
                <TableRow key={animal._id}>
                  <TableCell size="small" className="checkboxCell">
                    <Checkbox value={animal.id} />
                  </TableCell>
                  <TableCell size="small" className="idCell">
                    {animal._id}
                  </TableCell>
                  <TableCell size="small" className="nameCell">
                    {animal.name}
                  </TableCell>
                  <TableCell size="small" className="animalIdCell">
                    {animal.animalId}
                  </TableCell>
                  <TableCell size="small" className="breedCell">
                    {animal.breed}
                  </TableCell>
                  <TableCell size="small" className="breedCell">
                    {animal.color}
                  </TableCell>
                  <TableCell size="small" className="breedCell">
                    {animal.age}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        count={animals.animals ? animals.animals.length : 0}
        onPageChange={handlePageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10]}
        component="div"
      />
    </div>
  );
};
export default DashboardTable;
