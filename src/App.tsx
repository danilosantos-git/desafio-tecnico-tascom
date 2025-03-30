import { useState } from "react";
import { Task } from "./types/Task";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { Box, Container, Paper, Typography } from "@mui/material";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Omit<Task, "id" | "completed">) => {
    setTasks([
      ...tasks,
      {
        ...task,
        id: crypto.randomUUID(),
        completed: false,
      },
    ]);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (editedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === editedTask.id ? editedTask : task))
    );
  };

  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Todo List
        </Typography>
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          <Box sx={{ flex: "1 1 600px" }}>
            <Paper sx={{ p: 2 }}>
              <TaskList
                tasks={tasks}
                onDelete={deleteTask}
                onEdit={editTask}
                onToggleComplete={toggleComplete}
              />
            </Paper>
          </Box>

          <Box sx={{ flex: "1 1 300px", minWidth: "280px" }}>
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Progresso
              </Typography>
              <Typography variant="body1">
                Tarefas completadas: {completedCount} de {tasks.length}
              </Typography>
            </Paper>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Nova Tarefa
              </Typography>
              <TaskForm onSubmit={addTask} />
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
