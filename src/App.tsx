import { useState } from "react";
import { observer } from "mobx-react";
import { AddToDo } from "./components/AddToDo/AddToDo";
import { ToDoItem } from "./components/ToDoItem/ToDoItem";
import todoStore from "./store/toDoStore";
import { Button, Typography, Container } from "@mui/material";

const App: React.FC = observer(() => {
  const [highlightEven, setHighlightEven] = useState(false);
  const [highlightOdd, setHighlightOdd] = useState(false);

  const toggleHighlightEven = () => {
    setHighlightEven(!highlightEven);
    if (highlightOdd) setHighlightOdd(false);
  };

  const toggleHighlightOdd = () => {
    setHighlightOdd(!highlightOdd);
    if (highlightEven) setHighlightEven(false);
  };

  const handleRemoveFirst = () => {
    if (todoStore.todos.length > 0) {
      todoStore.removeTodo(todoStore.todos[0].id);
    }
  };

  const handleRemoveLast = () => {
    if (todoStore.todos.length > 0) {
      todoStore.removeTodo(todoStore.todos[todoStore.todos.length - 1].id);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        GreenAtom App #3
      </Typography>
      <AddToDo />
      <div>
        <Button
          variant="contained"
          color={highlightEven ? "secondary" : "primary"}
          onClick={toggleHighlightEven}
          style={{ marginRight: "10px" }}
        >
          {highlightEven
            ? "Убрать выделение чётных"
            : "Выделить чётные элементы"}
        </Button>
        <Button
          variant="contained"
          color={highlightOdd ? "secondary" : "primary"}
          onClick={toggleHighlightOdd}
          style={{ marginRight: "10px" }}
        >
          {highlightOdd
            ? "Убрать выделение нечётных"
            : "Выделить нечётные элементы"}
        </Button>
        <Button
          variant="outlined"
          onClick={handleRemoveFirst}
          disabled={todoStore.todos.length === 0}
          style={{ marginRight: "10px" }}
        >
          Удалить первый элемент
        </Button>
        <Button
          variant="outlined"
          onClick={handleRemoveLast}
          disabled={todoStore.todos.length === 0}
        >
          Удалить последний элемент
        </Button>
      </div>
      {todoStore.todos
        .slice()
        .sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted))
        .map((item, index) => (
          <ToDoItem
            key={item.id}
            item={item}
            isEven={highlightEven && index % 2 === 0}
            isOdd={highlightOdd && index % 2 !== 0}
          />
        ))}
    </Container>
  );
});

export default App;
