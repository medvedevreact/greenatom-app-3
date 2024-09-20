import React, { useState } from "react";
import todoStore from "../../store/toDoStore";
import { IconButton, Checkbox, Typography, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./ToDoItem.module.scss";

interface ToDoItemProps {
  item: {
    id: number;
    name: string;
    isCompleted: boolean;
  };
  isEven: boolean;
  isOdd: boolean;
}

export const ToDoItem: React.FC<ToDoItemProps> = ({ item, isEven, isOdd }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(item.name);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
    todoStore.removeTodo(item.id);
  };

  const handleToggle = () => {
    todoStore.toggleTodoCompletion(item.id);
  };

  const handleEdit = () => {
    const trimmedName = newName.trim();
    if (trimmedName) {
      todoStore.updateTodoName(item.id, trimmedName);
      setIsEditing(false);
      setError(null);
    } else {
      setError("Название задачи не может быть пустым.");
    }
  };

  return (
    <div
      className={`${styles.toDoItem} ${isEven ? styles.even : ""} ${
        isOdd ? styles.odd : ""
      }`}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Checkbox
          checked={item.isCompleted}
          onChange={handleToggle}
          color="primary"
          className={styles.checkbox}
        />
        {isEditing ? (
          <TextField
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={handleEdit}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleEdit();
            }}
            size="small"
            variant="outlined"
            error={!!error}
            helperText={error}
          />
        ) : (
          <Typography
            variant="body1"
            className={item.isCompleted ? styles.completed : ""}
            onClick={() => setIsEditing(true)}
          >
            {item.name}
          </Typography>
        )}
      </div>

      <IconButton onClick={handleDelete} className={styles.deleteButton}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};
