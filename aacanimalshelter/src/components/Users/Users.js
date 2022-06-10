import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import "./Users.css";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { setAnimals } from "../../redux/AnimalSlice";
import { setUsers } from "../../redux/UserSlice";

const axios = require("axios");

//Renders the user table with dummy data until back end is connected
const Users = () => {
  //local storage for variables used within Users component
  const { email, password } = useSelector((state) => state.auth);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [record, setRecord] = useState("");
  const [deleteId, setDeleteId] = useState(0);
  const dispatch = useDispatch();
  const url = "http://localhost:5000/users";
  const { users } = useSelector((state) => state.users);

  //varaibles used for opening and closing dialogs
  const [createUserDialogOpen, setCreateUserDialogOpen] = useState(false);
  const [deleteUserDialogOpen, setDeleteUserDialogOpen] = useState(false);

  //handles opening and closing of dialogs
  const handleCreateUserDialogOpen = () => setCreateUserDialogOpen(true);
  const handleCreateUserDialogClose = () => setCreateUserDialogOpen(false);
  const handleDeleteUserDialogOpen = () => setDeleteUserDialogOpen(true);
  const handleDeleteUserDialogClose = () => setDeleteUserDialogOpen(false);

  //creates new user with a random id
  const handleUserCreateSubmit = async () => {
    const newUser = { name: name, role: role, email: userEmail };
    const res = await axios.post(url, newUser);
    if (res) {
      const addedUserArr = [...users.users, res.data];
      dispatch(setUsers({ users: [...addedUserArr] }));
    }
    handleCreateUserDialogClose();
  };

  //deletes a user
  const handleDeleteSubmit = () => {
    const userIndex = users.users.find((user) => user._id === deleteId);
    axios.delete(`${url}/${userIndex._id}`);
    const newUserArr = users.users.filter((user) => user._id !== userIndex._id);
    dispatch(setUsers({ users: [...newUserArr] }));
    handleDeleteUserDialogClose();
  };

  //handles editing of a user through table cells
  const handleCellCommit = (id, field, value) => {
    if (field === "role") {
      axios.put(`${url}/${id}`, { role: value });
    }
    if (field === "name") {
      axios.put(`${url}/${id}`, { name: value });
    }
    if (field === "email") {
      axios.put(`${url}/${id}`, { email: value });
    }
  };

  //ensures email and password values are present for page to load other wise redirects to login page
  if (email && password) {
    return (
      <>
        <div className="userTable">
          <DataGrid
            rows={[...users.users]}
            getRowId={(row) => row._id}
            rowsPerPageOptions={[10]}
            columns={[
              {
                field: "action",
                headerName: "Delete",
                type: "actions",
                flex: 0.25,
                getActions: (params) => [
                  <GridActionsCellItem
                    icon={<Delete />}
                    onClick={(e) => {
                      setDeleteId(params.row._id);
                      setRecord(params.row.name);
                      handleDeleteUserDialogOpen();
                    }}
                  />,
                ],
              },
              { field: "name", headerName: "Name", flex: 1, editable: true },
              { field: "role", headerName: "Role", flex: 1, editable: true },
              { field: "email", headerName: "Email", flex: 1, editable: true },
            ]}
            pageSize={10}
            rowsPerPage={10}
            isCellEditable={(params) => params.row.role !== "admin"}
            onCellEditCommit={(params) =>
              handleCellCommit(params.id, params.field, params.value)
            }
          />
          <p className="text">
            Note: To edit data in table please double click on the cell you
            would like to edit
          </p>
        </div>
        <Button variant="contained" onClick={handleCreateUserDialogOpen}>
          Add New User
        </Button>

        {/* create dialog  */}
        <Dialog open={createUserDialogOpen}>
          <DialogTitle className="dialogTitle">Create New User</DialogTitle>
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
                  id="Name"
                  label="Name"
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  required
                  id="Role"
                  label="Role"
                  onChangeCapture={(e) => setRole(e.target.value)}
                />
                <TextField
                  required
                  id="Email"
                  label="Email"
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCreateUserDialogClose}>Close</Button>
            <Button type="submit" onClick={handleUserCreateSubmit}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>

        {/* delete dialog */}
        <Dialog open={deleteUserDialogOpen}>
          <DialogTitle className="dialogTitle">Delete {record}</DialogTitle>
          <DialogContent>
            Are you sure you want to delete {record}?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteUserDialogClose}>No</Button>
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
export default Users;
