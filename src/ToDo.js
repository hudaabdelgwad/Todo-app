import { alertTitleClasses, Divider, Grid } from "@mui/material";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useContext, useState } from "react";
import { ToDoContext } from "./Contexts/ToDoContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckIcon from "@mui/icons-material/Check";
import Button from "@mui/material/Button";

export default function ToDo({ todo ,theme }) {
  const { toDos, setToDos } = useContext(ToDoContext);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  function handlDelete(e){
    const updatedToDos= toDos.filter((t)=>t.id!==todo.id);
    setToDos(updatedToDos);
    localStorage.setItem("todo",JSON.stringify(updatedToDos))
  }
  const handleClose = () => {
    setOpen(false);
  };

  function handlCheckClick() {
    const updatedToDos = toDos.map((t) => {
      if (t.id === todo.id) t.isCompleted = !t.isCompleted;
      return t;
    });
    setToDos(updatedToDos);
    localStorage.setItem("todo",JSON.stringify(updatedToDos))

  }

  return (
    <>
      <Grid
        container
        spacing={0}
        className={`!flex items-center  !rounded w-full p-2 h-14 cursor-pointer  ${
          theme ? "!bg-DarkList" : "!bg-lightList"
        } `}
        
      >
        <Grid size={1} className="flex justify-center">
          <div
            className={`relative flex justify-center items-center 
    bg-inputColor/10
    hover:bg-gradient-to-r from-firstColorGred to-secondColorGred 
    rounded-full 
    after:w-[90%] after:h-[90%] after:absolute ${theme?"after:bg-DarkList":"after:bg-lightList"} after:bg-DarkList after:z-10 
    after:rounded-full after:top-[50%] after:left-[50%] after:-translate-x-1/2 after:-translate-y-1/2
    ${todo.isCompleted ? "after:hidden bg-gradient-to-r" : ""}`}
            onClick={handlCheckClick}
          >
            <CheckIcon
              className="text-white w-full h-1vh p-1"
              fontSize="small"
            />
          </div>
        </Grid>
        <Grid
          size={10}
          className={`cursor-pointer pl-2 text-lg ${theme?"text-darkFont ":""}text-left ${todo.isCompleted?"line-through opacity-30":""} `}
        >
  
          {todo.title}
      
        </Grid>
        <Grid size={1} className="flex justify-center" >
          <ClearOutlinedIcon
          onClick={handleClickOpen}
            className="text-inputColor/0  hover:text-inputColor/50 cursor-pointer" 
           
          />
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delte it?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            After deleting it there is no going back
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlDelete}>Yes delete</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
