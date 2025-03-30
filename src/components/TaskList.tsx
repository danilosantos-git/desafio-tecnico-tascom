import { useState } from "react";
import { Task } from "../types/Task";
import TaskForm from "./TaskForm";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Typography,
  Paper,
  Collapse,
  Box,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

type TaskListProps = {
  tasks: Task[];
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onToggleComplete: (id: string) => void;
};

export default function TaskList({
  tasks,
  onDelete,
  onEdit,
  onToggleComplete,
}: TaskListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <List sx={{ width: "100%" }}>
      {tasks.map((task) => (
        <Paper key={task.id} sx={{ mb: 1, overflow: "hidden" }} elevation={1}>
          <ListItem
            secondaryAction={
              <div>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => setEditingId(task.id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onDelete(task.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            }
          >
            <Checkbox
              checked={task.completed}
              onChange={() => onToggleComplete(task.id)}
              edge="start"
            />
            <ListItemText
              primary={
                <Typography
                  variant="subtitle1"
                  sx={{
                    textDecoration: task.completed ? "line-through" : "none",
                    color: task.completed ? "text.secondary" : "text.primary",
                  }}
                >
                  {task.title}
                </Typography>
              }
              secondary={task.description}
            />
          </ListItem>
          <Collapse in={editingId === task.id}>
            <Box sx={{ p: 2 }}>
              <TaskForm
                initialData={task}
                onSubmit={(data) => {
                  onEdit({ ...task, ...data });
                  setEditingId(null);
                }}
              />
            </Box>
          </Collapse>
        </Paper>
      ))}
      {tasks.length === 0 && (
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ py: 4 }}
        >
          Nenhuma tarefa cadastrada
        </Typography>
      )}
    </List>
  );
}
