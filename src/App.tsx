import { useState } from "react";
import { Task } from "./types/Task";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import {
  Box,
  Container,
  Paper,
  Typography,
  Tab,
  Tabs,
  useTheme,
} from "@mui/material";
import ChuckMessage from "./components/ChuckMessage";
import { useTaskQuery } from "./hooks/useTaskQuery";
import { useCreateTaskMutation } from "./hooks/useCreateTaskMutation";
import { useUpdateTaskMutation } from "./hooks/useUpdateTaskMutation";
import { useDeleteTaskMutation } from "./hooks/useDeleteTaskMutation";

function App() {
  const [currentTab, setCurrentTab] = useState(0);
  const theme = useTheme();
  const { data: tasks = [], isLoading } = useTaskQuery();
  const createTaskMutation = useCreateTaskMutation();
  const updateTaskMutation = useUpdateTaskMutation();
  const deleteTaskMutation = useDeleteTaskMutation();

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
    <Box
      bgcolor={theme.palette.background.default}
      minHeight="100vh"
      color={theme.palette.text.primary}
    >
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Box mb={4}>
          <Box display="flex" flexDirection="row">
            <Typography variant="h2" fontWeight="600" mb={1}>
              To
            </Typography>
            <Typography variant="h2" fontWeight={275}>
              day
            </Typography>
          </Box>
          <Box display="flex" flexDirection="row">
            <Typography
              variant="subtitle1"
              color={theme.palette.text.secondary}
            >
              Wake up, go ahead, do the thing not tomorrow, do
            </Typography>
            <Typography
              variant="subtitle1"
              fontWeight="700"
              color={theme.palette.text.secondary}
              ml={0.5}
            >
              to
            </Typography>
            <Typography
              variant="subtitle1"
              fontWeight="275"
              color={theme.palette.text.secondary}
            >
              day.
            </Typography>
          </Box>
        </Box>

        <Box height={52} mb={2}>
          <Box
            bgcolor={theme.palette.background.secondary}
            display="inline-flex"
            borderRadius="10px"
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
                color={theme.palette.text.secondary}
                sx={{
                  minHeight: 36,
                  height: 36,
                  width: 87,
                  padding: 0,
                  borderRadius: "10px",
                  "&.Mui-selected": {
                    color: theme.palette.text.primary,
                    bgcolor: theme.palette.background.dark,
                  },
                  textTransform: "none",
                }}
              />
              <Tab
                label="Metrics"
                color={theme.palette.text.secondary}
                sx={{
                  minHeight: 36,
                  height: 36,
                  width: 87,
                  padding: 0,
                  borderRadius: "10px",
                  "&.Mui-selected": {
                    color: theme.palette.text.primary,
                    bgcolor: theme.palette.background.dark,
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
              bgcolor={theme.palette.background.secondary}
              borderRadius={"10px"}
              paddingX={2}
              paddingY={2}
              maxHeight={"589px"}
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
                  mb: 3,
                  pt: "15px",
                  pb: "20px",
                  bgcolor: theme.palette.background.default,
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="subtitle1"
                  align="center"
                  color={theme.palette.text.primary}
                  fontWeight="600"
                  fontSize="20px"
                >
                  Finished tasks quantity
                </Typography>
                <Typography align="center" fontWeight="600" fontSize="56px">
                  {completedCount.toString().padStart(2, "0")}
                </Typography>
              </Paper>
              <Paper
                sx={{
                  p: 3,
                  bgcolor: theme.palette.background.default,
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  fontWeight={"600"}
                  fontSize={"20px"}
                  mb={2}
                  gutterBottom
                >
                  Add new to do
                </Typography>
                <TaskForm onSubmit={addTask} />
              </Paper>
            </Box>
          </Box>
        )}

        {currentTab === 1 && (
          <Box p={3}>
            <Typography>Metrics content</Typography>
          </Box>
        )}
        <ChuckMessage />
      </Container>
      <Box
        component="footer"
        textAlign="center"
        color={theme.palette.text.secondary}
      >
        <Typography variant="body2">@Did from ❤️ by Danilo Santos</Typography>
      </Box>
    </Box>
  );
}

export default App;
