import { useState } from "react";
import { Task } from "../types/Task";
import TaskForm from "./TaskForm";
import {
  List,
  ListItem,
  IconButton,
  Checkbox,
  Typography,
  Paper,
  Collapse,
  Box,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import deleteIcon from "../assets/deleteIcon.svg";
import { format } from "date-fns";

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
    <List
      sx={{
        width: "100%",
        maxHeight: "100%",
        overflowY: "auto",
        padding: 0,
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Typography variant="h6" fontWeight={"600"} mb={2}>
        To do
      </Typography>
      {tasks.map((task, index) => (
        <Paper
          key={index}
          sx={{
            mb: 1,
            overflow: "hidden",
            position: "relative",
            borderRadius: "10px",
          }}
          elevation={0}
        >
          <ListItem
            secondaryAction={
              <>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => setEditingId(task.id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  sx={{ marginLeft: "10px" }}
                  onClick={() => onDelete(task.id)}
                >
                  <img
                    src={deleteIcon}
                    alt="delete"
                    width={24}
                    height={24}
                    style={{ opacity: 0.7 }}
                  />
                </IconButton>
              </>
            }
          >
            <Checkbox
              checked={task.isCompleted}
              onChange={() => onToggleComplete(task.id)}
              edge="start"
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                ml: 2,
                maxWidth: "calc(100% - 90px)",
                overflowWrap: "break-word",
                wordWrap: "break-word",
                wordBreak: "break-word",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  textDecoration: task.isCompleted ? "line-through" : "none",
                  color: task.isCompleted ? "text.secondary" : "text.primary",
                  mb: 0.5,
                  overflowWrap: "break-word",
                  wordWrap: "break-word",
                  wordBreak: "break-word",
                }}
              >
                {task.title}
              </Typography>
              <Box
                display={"flex"}
                sx={{
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                  gap: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    mb: { xs: 0.5, sm: 0 },
                    overflowWrap: "break-word",
                    wordWrap: "break-word",
                    wordBreak: "break-word",
                  }}
                >
                  {task.description}
                </Typography>
                <Typography
                  variant="caption"
                  minWidth={160}
                  sx={{
                    color: "text.secondary",
                    overflowWrap: "break-word",
                    wordWrap: "break-word",
                    wordBreak: "break-word",
                  }}
                >
                  {format(
                    new Date(task.updatedAt),
                    "dd MMMM yyyy 'at' hh:mm a"
                  )}
                </Typography>
              </Box>
            </Box>
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
