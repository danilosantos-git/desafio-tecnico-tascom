import { useState } from "react";
import { Task } from "./types/Task";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { Box, Container, Paper, Typography, Tab, Tabs } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1E1E1E",
      paper: "#2D2D2D",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "rgba(255, 255, 255, 0.7)",
    },
  },
});

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTab, setCurrentTab] = useState(0);

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
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          bgcolor: "background.default",
          minHeight: "100vh",
          color: "text.primary",
        }}
      >
        <Container maxWidth="lg" sx={{ pt: 4 }}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: "bold",
                mb: 1,
              }}
            >
              Today
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              Wake up, go ahead, do the thing not tomorrow, do today.
            </Typography>
          </Box>

          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
            <Tabs
              value={currentTab}
              onChange={(_, newValue) => setCurrentTab(newValue)}
              sx={{
                "& .MuiTab-root": {
                  color: "text.secondary",
                  "&.Mui-selected": {
                    color: "text.primary",
                  },
                },
              }}
            >
              <Tab label="Todo" />
              <Tab label="Metrics" />
            </Tabs>
          </Box>

          {currentTab === 0 && (
            <Box
              sx={{
                display: "flex",
                gap: 3,
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ flex: "1 1 600px" }}>
                <TaskList
                  tasks={tasks}
                  onDelete={deleteTask}
                  onEdit={editTask}
                  onToggleComplete={toggleComplete}
                />
              </Box>

              <Box sx={{ flex: "1 1 300px", minWidth: "280px" }}>
                <Paper
                  sx={{
                    p: 3,
                    mb: 3,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h4" gutterBottom align="center">
                    {completedCount.toString().padStart(2, "0")}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    align="center"
                    sx={{ color: "text.secondary" }}
                  >
                    Finished tasks quantity
                  </Typography>
                </Paper>
                <Paper
                  sx={{
                    p: 3,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Add new to do
                  </Typography>
                  <TaskForm onSubmit={addTask} />
                </Paper>
              </Box>
            </Box>
          )}

          {currentTab === 1 && (
            <Box sx={{ p: 3 }}>
              <Typography>Metrics content</Typography>
            </Box>
          )}
        </Container>
        <Box
          component="footer"
          sx={{
            py: 3,
            mt: 4,
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          <Typography variant="body2">
            @Did from ❤️ by Your Name Here
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
