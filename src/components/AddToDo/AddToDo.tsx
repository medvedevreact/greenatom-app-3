import { useState } from "react";
import { observer } from "mobx-react";
import todoStore from "../../store/toDoStore";
import { TextField, Button } from "@mui/material";
import styles from "./AddToDo.module.scss";

export const AddToDo: React.FC = observer(() => {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim()) {
      todoStore.addTodo(text);
      setText("");
    }
  };

  return (
    <div className={styles.addToDo}>
      <TextField
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={styles.input}
        placeholder="Добавить задачу..."
        fullWidth
        InputProps={{
          className: styles.inputField,
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAdd}
        className={styles.addButton}
      >
        Добавить
      </Button>
    </div>
  );
});
