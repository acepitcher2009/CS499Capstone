import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import "./Animals.css";
import { useState } from "react";
import { Box } from "@mui/system";
import { Redirect } from "react-router-dom";
import { setAnimals } from "../../redux/AnimalSlice";

const axios = require("axios");

//renders animal table with dummy data until back end connected
const Animals = () => {
  //accessed email, password, and animals values from redux, sets url for requests to DB
  const { email, password } = useSelector((state) => state.auth);
  const { animals } = useSelector((state) => state.animal);
  const url = "http://localhost:5000/animals";

  //local state storage using
  const [name, setName] = useState("");
  const [animalId, setAnimalId] = useState(0);
  const [breed, setBreed] = useState("");
  const [color, setColor] = useState("");
  const [age, setAge] = useState(0);
  const [deleteId, setDeleteId] = useState(0);
  const [record, setRecord] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [deleteDialogOpen, SetDeleteDialogOpen] = useState(false);
  const dispatch = useDispatch();

  //handles delete and create dialog opening and closing
  const handleCreateDialogOpen = () => setCreateDialogOpen(true);
  const handleCreateDialogClose = () => setCreateDialogOpen(false);
  const handleDeleteDialogOpen = () => SetDeleteDialogOpen(true);
  const handleDeleteDialogClose = () => SetDeleteDialogOpen(false);

  //handle commit of cell when editing is complete
  const handleCellCommit = (id, field, value) => {
    if (field === "age") {
      axios.put(`${url}/${id}`, { age: value });
    }
    if (field === "breed") {
      axios.put(`${url}/${id}`, { breed: value });
    }
    if (field === "color") {
      axios.put(`${url}/${id}`, { color: value });
    }
  };

  //handles creation of new animal and populates to table
  const handleSubmit = async () => {
    const newAnimal = {
      name: name,
      animalId: animalId,
      breed: breed,
      color: color,
      age: age,
      lat: lat,
      lng: lng,
    };
    const res = await axios.post(url, newAnimal);
    if (res) {
      dispatch(setAnimals({ animals: [...animals.animals, res.data] }));
    }
    handleCreateDialogClose();
  };

  //handles deletion of an animal
  const handleDeleteSubmit = () => {
    const animalIndex = animals.animals.find(
      (animal) => animal._id === deleteId
    );
    axios.delete(`${url}/${animalIndex._id}`);
    const newAnimalArr = animals.animals.filter(
      (animal) => animal._id !== animalIndex._id
    );
    dispatch(setAnimals({ animals: [...newAnimalArr] }));
    handleDeleteDialogClose();
  };

  //ensures email and password have values in order to render the page
  if (email && password) {
    return (
      <>
        <div className="animalTable">
          <DataGrid
            rows={[...animals.animals]}
            getRowId={(row) => row._id}
            columns={[
              {
                field: "action",
                headerName: "Delete",
                type: "actions",
                flex: 1,
                getActions: (params) => [
                  <GridActionsCellItem
                    icon={<Delete />}
                    onClick={(e) => {
                      setDeleteId(params.row._id);
                      setRecord(params.row.name);
                      handleDeleteDialogOpen();
                    }}
                  />,
                ],
              },
              { field: "_id", headerName: "ID", flex: 1, editable: false },
              { field: "name", headerName: "Name", flex: 1, editable: true },
              {
                field: "animalId",
                headerName: "Animal Id",
                flex: 1,
                editable: false,
              },
              {
                field: "breed",
                headerName: "Animal Breed",
                flex: 1,
                editable: true,
              },
              { field: "color", headerName: "Color", flex: 1, editable: true },
              { field: "age", headerName: "Age", flex: 1, editable: true },
            ]}
            pageSize={10}
            rowsPerPage={10}
            rowsPerPageOptions={[10]}
            isCellEditable={(params) =>
              params.row !== "id" || params.row !== "animalId"
            }
            onCellEditCommit={(params) => {
              console.log(params.field);
              handleCellCommit(params.id, params.field, params.value);
            }}
            components={{ Toolbar: GridToolbar }}
          />
        </div>
        <Button variant="contained" onClick={handleCreateDialogOpen}>
          Add New Animal
        </Button>
        {/* create dialog */}
        <Dialog open={createDialogOpen}>
          <DialogTitle className="dialogTitle">Create New Animal</DialogTitle>
          <DialogContent>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{
                "& .MuiTextField-root": { m: 1, marginLeft: 15, width: "35ch" },
              }}
            >
              <div>
                <TextField
                  required
                  id="animal-name"
                  label="Name"
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  required
                  id="breed"
                  label="Breed"
                  onChangeCapture={(e) => setBreed(e.target.value)}
                />
                <TextField
                  required
                  id="color"
                  label="Animal Color"
                  onChange={(e) => setColor(e.target.value)}
                />
                <TextField
                  required
                  id="age"
                  label="Animal Age"
                  onChange={(e) => setAge(e.target.value)}
                />
                <TextField
                  required
                  id="animalId"
                  label="AnimalId"
                  onChange={(e) => setAnimalId(e.target.value)}
                />
                <TextField
                  required
                  id="age"
                  label="Location Lat"
                  onChange={(e) => setLat(e.target.value)}
                />
                <TextField
                  required
                  id="age"
                  label="Location Long"
                  onChange={(e) => setLng(e.target.value)}
                />
              </div>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCreateDialogClose}>Close</Button>
            <Button type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        {/* delete dialog */}
        <Dialog open={deleteDialogOpen}>
          <DialogTitle className="dialogTitle">Delete {record}</DialogTitle>
          <DialogContent>
            Are you sure you want to delete {record}?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteDialogClose}>No</Button>
            <Button type="submit" onClick={handleDeleteSubmit}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
  dispatch(setAnimals({ animals: [] }));
  return <Redirect to="/login" />;
};
export default Animals;
