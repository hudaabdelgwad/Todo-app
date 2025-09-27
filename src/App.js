import logo from "./logo.svg";
import "./App.css";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Brightness3SharpIcon from "@mui/icons-material/Brightness3Sharp";
import LightModeIcon from "@mui/icons-material/LightMode";
import ToDoList from "./ToDoList";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { useContext, useEffect, useState } from "react";
import { ToDoContext } from "./Contexts/ToDoContext";
import { v4 as uuidv4 } from "uuid"; 
import { DarkThemContext } from "./Contexts/DarkThemContext";
const initialToDos = [
  {
    id: uuidv4(),
    title: "First ToDo Item",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Second ToDo Item",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Third ToDo Item",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Fourth ToDo Item",
    isCompleted: false,
  },
];

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0, // default: 0
      sm: 640, // custom small screens start at 480px
      md: 768, // custom medium screens
      lg: 1200, // custom large screens
      xl: 1600, // extra large
    },
  },
});

function App() {
  
  
  const [dark,setDark]=useState(false)
  useEffect(()=>{
    setDark(JSON.parse(localStorage.getItem("mode")))
  },[])
  function handlDarkClick() {
    const updateTheme=!dark;
    setDark(updateTheme);
    localStorage.setItem("mode",updateTheme)
  }
  const [toDos, setToDos] = useState(initialToDos);
  return (
    <ToDoContext.Provider value={{ toDos, setToDos: setToDos }}>
      <ThemeProvider theme={theme}>
        <div className={`App !font-JosefinSans flex flex-col justify-center bg-lightList items-center w-full h-lvh ${dark?"!bg-dark":"!text-black"}`}>
          <header className={`w-full ${dark?"bg-mobileDark sm:bg-desktopDark":"bg-mobileLight sm:bg-desktopLight "} h-[40vh] bg-cover bg-no-repeat absolute top-0 `}></header>
          <Container maxWidth="sm" className="z-10 relative">
            <main className="max-h-[80vh] z-10 !w-full ">
              <Grid
                container
                spacing={16}
                className={`!text-lightColor !flex  text-4xl  w-full max-w-[640px] fixed top-[10vh] `}
              >
             
                <Grid size={8}>
                  <h1 className="tracking-[1rem] font-bold text-left ">TODO</h1>
                </Grid>
                <Grid size={4} className="cursor-pointer">
                  <DarkModeIcon className={`${dark?"!hidden":""} !text-4xl`} onClick={()=>{handlDarkClick()}} />
                  <LightModeIcon className={`${dark?"":"!hidden"}  !text-4xl`} onClick={()=>{handlDarkClick()}}/>
                </Grid>
              </Grid>
              <div className="mt-4 ">
                <ToDoList theme={dark}/>
              </div>
            </main>
          </Container>
        </div>
      </ThemeProvider>
    </ToDoContext.Provider>
  );
}

export default App;
