import { useQuery } from "@tanstack/react-query";
import { taskService } from "../services/api";
import { Task } from "../types/Task";

export function useTaskQuery() {
  return useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: taskService.getTasks,
  });
}
