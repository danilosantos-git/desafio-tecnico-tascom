import { useState } from "react";
import { Task } from "./types/Task";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { Box, Container, Paper, Typography, Tab, Tabs } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { taskService } from "./services/api";

const darkTheme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif',
    h1: {
      fontFamily: '"Poppins", sans-serif',
    },
    h2: {
      fontFamily: '"Poppins", sans-serif',
    },
    h3: {
      fontFamily: '"Poppins", sans-serif',
    },
    h4: {
      fontFamily: '"Poppins", sans-serif',
    },
    h5: {
      fontFamily: '"Poppins", sans-serif',
    },
    h6: {
      fontFamily: '"Poppins", sans-serif',
    },
    subtitle1: {
      fontFamily: '"Poppins", sans-serif',
    },
    subtitle2: {
      fontFamily: '"Poppins", sans-serif',
    },
    body1: {
      fontFamily: '"Poppins", sans-serif',
    },
    body2: {
      fontFamily: '"Poppins", sans-serif',
    },
  },
  palette: {
    mode: "dark",
    background: {
      default: "#333333",
      paper: "#474747",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "rgba(255, 255, 255, 0.7)",
    },
  },
});

// Criar o cliente do Query
const queryClient = new QueryClient();

// Wrapper da aplicação com o Provider
function AppWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

function App() {
  const [currentTab, setCurrentTab] = useState(0);
  const queryClient = useQueryClient();

  // Query para buscar as tasks
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: taskService.getTasks,
  });

  // Mutation para criar task
  const createTaskMutation = useMutation({
    mutationFn: taskService.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // Mutation para atualizar task
  const updateTaskMutation = useMutation({
    mutationFn: taskService.updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // Mutation para deletar task
  const deleteTaskMutation = useMutation({
    mutationFn: taskService.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const addTask = (task: Omit<Task, "id" | "isCompleted">) => {
    createTaskMutation.mutate(task);
  };

  const deleteTask = (id: string) => {
    deleteTaskMutation.mutate(id);
  };

  const editTask = (editedTask: Task) => {
    updateTaskMutation.mutate(editedTask);
  };

  const toggleComplete = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      updateTaskMutation.mutate({
        ...task,
        isCompleted: !task.isCompleted,
      });
    }
  };

  const completedCount = tasks.filter((task) => task.isCompleted).length;

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
            <Box display={"flex"} flexDirection={"row"}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: "600",
                  mb: 1,
                }}
              >
                To
              </Typography>
              <Typography sx={{ fontWeight: 275 }} variant="h2" component="h1">
                day
              </Typography>
            </Box>
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              Wake up, go ahead, do the thing not tomorrow, do today.
            </Typography>
          </Box>

          <Box height={52} sx={{ mb: 2 }}>
            <Box
              bgcolor={"#3D3D3D"}
              display={"inline-flex"}
              borderRadius={"10px"}
              padding={1}
            >
              <Tabs
                value={currentTab}
                onChange={(_, newValue) => setCurrentTab(newValue)}
                sx={{
                  minHeight: 36,
                  "& .MuiTabs-indicator": {
                    display: "none",
                  },
                }}
              >
                <Tab
                  label="Todo"
                  sx={{
                    minHeight: 36,
                    height: 36,
                    width: 87,
                    padding: 0,
                    borderRadius: "10px",
                    color: "text.secondary",
                    "&.Mui-selected": {
                      color: "#FFFFFF",
                      bgcolor: "#1A1A1A",
                    },
                    textTransform: "none",
                  }}
                />
                <Tab
                  label="Metrics"
                  sx={{
                    minHeight: 36,
                    height: 36,
                    width: 87,
                    padding: 0,
                    borderRadius: "10px",
                    color: "text.secondary",
                    "&.Mui-selected": {
                      color: "#FFFFFF",
                      bgcolor: "#1A1A1A",
                    },
                    textTransform: "none",
                  }}
                />
              </Tabs>
            </Box>
          </Box>

          {currentTab === 0 && (
            <Box
              sx={{
                display: "flex",
                gap: 3,
                flexWrap: "wrap",
              }}
            >
              <Box
                sx={{ flex: "1 1 600px" }}
                bgcolor={"#3D3D3D"}
                borderRadius={"10px"}
                paddingX={3}
                paddingY={2}
              >
                {isLoading ? (
                  <Typography>Carregando...</Typography>
                ) : (
                  <TaskList
                    tasks={tasks}
                    onDelete={deleteTask}
                    onEdit={editTask}
                    onToggleComplete={toggleComplete}
                  />
                )}
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
          <Typography variant="body2">@Did from ❤️ by Danilo Santos</Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default AppWrapper;
