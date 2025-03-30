import { useForm } from "react-hook-form";
import { Task } from "../types/Task";
import { TextField, Button, Box } from "@mui/material";

type TaskFormProps = {
  onSubmit: (data: Omit<Task, "id" | "completed">) => void;
  initialData?: Task;
};

export default function TaskForm({ onSubmit, initialData }: TaskFormProps) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: initialData || {
      title: "",
      description: "",
    },
  });

  const onSubmitForm = (data: Omit<Task, "id" | "completed">) => {
    onSubmit(data);
    if (!initialData) {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          {...register("title", { required: true })}
          label="Título"
          variant="outlined"
          fullWidth
          size="small"
        />
        <TextField
          {...register("description", { required: true })}
          label="Descrição"
          variant="outlined"
          multiline
          rows={3}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {initialData ? "Atualizar" : "Adicionar"} Tarefa
        </Button>
      </Box>
    </form>
  );
}
