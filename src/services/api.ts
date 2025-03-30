import axios from "axios";
import { Task } from "../types/Task";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const taskService = {
  getTasks: async () => {
    const { data } = await api.get<Task[]>("/tasks");
    return data;
  },

  createTask: async (task: Omit<Task, "id" | "isCompleted">) => {
    const { data } = await api.post<Task>("/tasks", {
      ...task,
      isCompleted: false,
    });
    return data;
  },

  updateTask: async (task: Task) => {
    const { data } = await api.patch<Task>(`/tasks/${task.id}`, task);
    return data;
  },

  deleteTask: async (id: string) => {
    await api.delete(`/tasks/${id}`);
  },
};
