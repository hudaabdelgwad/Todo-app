import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import boxicons from "boxicons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import ToDo from "./ToDo";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import { ToDoContext } from "./Contexts/ToDoContext";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function ToDoList({ theme }) {
  console.log(theme);

  const { toDos, setToDos } = useContext(ToDoContext);
  const [filterToDo, setFilterToDo] = useState("all");
  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todo")) ?? [];
    setToDos(storageTodos);
  }, []);

  const [titleInput, setTitleInput] = useState("");
  function handleKeyDown(e) {
    if (e.key === "Enter" && titleInput !== "") {
      const updatedToDos = [
        ...toDos,
        {
          id: uuidv4(),
          title: titleInput,
          isCompleted: false,
        },
      ];
      setToDos(updatedToDos);
      localStorage.setItem("todo", JSON.stringify(updatedToDos));
      setTitleInput("");
    }
  }
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(toDos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setToDos(items);
    localStorage.setItem("todo", JSON.stringify(items));
  }
  let rednerTodo = toDos;

  if (filterToDo === "all") rednerTodo = toDos;
  else if (filterToDo === "completed")
    rednerTodo = toDos.filter((t) => t.isCompleted);
  else if (filterToDo === "active")
    rednerTodo = toDos.filter((t) => !t.isCompleted);

  return (
    <>
      <div className="bg-none ">
        <Grid
          container
          spacing={0}
          className={`${
            theme ? "!bg-DarkList" : "!bg-lightList"
          }  mb-5 p-2 !rounded-md h-14 cursor-pointer  shadow-custom-light `}
        >
          <Grid size={1} className="flex justify-center ">
            <svg width="40" height="40" viewBox="0 0 40 40">
              <defs>
                <linearGradient
                  id="circleGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="var(--firstColorGred)" />
                  <stop offset="100%" stopColor="var(--secondColorGred)" />
                </linearGradient>

                {/* Hover gradient */}
                <linearGradient
                  id="circleGradientHover"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="hsl(192, 100%, 67%)" />
                  <stop offset="100%" stopColor="hsl(280, 87%, 65%)" />
                </linearGradient>
              </defs>

              <circle
                cx="20"
                cy="20"
                r="9"
                fill="transparent"
                stroke=""
                strokeWidth="1"
                className="hover:stroke-[url(#circleGradientHover)] stroke-inputColor/10"
              />
            </svg>
          </Grid>

          <Grid size={11} className="cursor-pointer pl-2 !flex items-center ">
            <input
              type="text"
              className="bg-transparent w-full  rounded  placeholder:text-lg outline-none font-normal text-darkFont placeholder:!text-darkFont "
              placeholder="Create a new todo..."
              value={titleInput}
              onChange={(e) => {
                setTitleInput(e.target.value);
              }}
              onKeyDown={(e) => handleKeyDown(e)}
            ></input>
          </Grid>
        </Grid>
        <div className={`rounded-md max-h-[60vh] overflow-auto ${
            theme ? "!bg-DarkList" : "!bg-lightList"
          } shadow-custom-light `}>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="todos">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {rednerTodo.map((td, index) => (
                    <Draggable key={td.id} draggableId={td.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <ToDo todo={td} theme={theme} />
                          <Divider />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <Grid container spacing={0} className={`bg-wh p-2 ${
            theme ? "!bg-DarkList" : "!bg-lightList"
          }`}>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Button
                variant="text"
                className="!text-xs !font-JosefinSans !lowercase !text-dividerDark"
                sx={{ "&:hover": { backgroundColor: "inherit" } }}
              >
                {toDos.filter((t) => !t.isCompleted).length} items left
              </Button>
            </Grid>
            <Grid size={{ sm: 4 }}>
              <div className="hidden sm:flex">
                <Grid container spacing={0} className="  rounded ">
                  <Grid size={4}>
                    <Button
                      variant="text"
                      sx={{ "&:hover": { backgroundColor: "inherit" } }}
                      className={`!text-xs !capitalize !text-dividerDark !font-semibold hover:!text-textHover !font-JosefinSans ${
                        filterToDo === "all" ? "!text-textHover" : ""
                      }`}
                      onClick={() => setFilterToDo("all")}
                    >
                      All
                    </Button>
                  </Grid>
                  <Grid size={4}>
                    <Button
                      variant="text"
                      className={`!text-xs !capitalize !text-dividerDark !font-semibold hover:!text-textHover !font-JosefinSans ${
                        filterToDo === "active" ? "!text-textHover" : ""
                      }`}
                      sx={{ "&:hover": { backgroundColor: "inherit" } }}
                      onClick={() => setFilterToDo("active")}
                    >
                      Active
                    </Button>
                  </Grid>
                  <Grid size={4}>
                    <Button
                      variant="text"
                      className={`!text-xs !capitalize !text-dividerDark !font-semibold hover:!text-textHover !font-JosefinSans ${
                        filterToDo === "completed" ? "!text-textHover" : ""
                      }`}
                      sx={{ "&:hover": { backgroundColor: "inherit" } }}
                      onClick={() => setFilterToDo("completed")}
                    >
                      Completed
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Button
                variant="text"
                className="fButton-hover "
                sx={{ "&:hover": { backgroundColor: "inherit" } }}
                onClick={() => {
                  const updatedToDo = toDos.filter((td) => !td.isCompleted);
                  setToDos(updatedToDo);
                  localStorage.setItem("todo", JSON.stringify(updatedToDo));
                }}
              >
                Clear completed
              </Button>
            </Grid>
          </Grid>
        </div>
        {/*   mb-5 p-2  h-14 cursor-pointer    */}
        <Grid
          container
          spacing={0}
          className={`${
            theme ? "!bg-DarkList" : "!bg-lightList"
          }  mt-4 p-2 !rounded-md h-14 cursor-pointer shadow-custom-light sm:!hidden`}
        >
          <Grid size={4}>
            <Button
              variant="text"
              sx={{ "&:hover": { backgroundColor: "inherit" } }}
              className={`!text-xs !capitalize !text-dividerDark !font-semibold hover:!text-textHover !font-JosefinSans ${
                filterToDo === "all" ? "!text-textHover" : ""
              }`}
              onClick={() => setFilterToDo("all")}
            >
              All
            </Button>
          </Grid>
          <Grid size={4}>
            <Button
              variant="text"
              className={`!text-xs !capitalize !text-dividerDark !font-semibold hover:!text-textHover !font-JosefinSans ${
                filterToDo === "active" ? "!text-textHover" : ""
              }`}
              sx={{ "&:hover": { backgroundColor: "inherit" } }}
              onClick={() => setFilterToDo("active")}
            >
              Active
            </Button>
          </Grid>
          <Grid size={4}>
            <Button
              variant="text"
              className={`!text-xs !capitalize !text-dividerDark !font-semibold hover:!text-textHover !font-JosefinSans ${
                filterToDo === "completed" ? "!text-textHover" : ""
              }`}
              sx={{ "&:hover": { backgroundColor: "inherit" } }}
              onClick={() => setFilterToDo("completed")}
            >
              Completed
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
