import { useForm } from "react-hook-form";
import { Task } from "../types/Task";
import { Button, Box, useTheme } from "@mui/material";
import { Input } from "./Input";

type TaskFormProps = {
  onSubmit: (data: Omit<Task, "id" | "completed">) => void;
  initialData?: Task;
};

type FormInputs = {
  title: string;
  description: string;
};

export default function TaskForm({ onSubmit, initialData }: TaskFormProps) {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: initialData || {
      title: "",
      description: "",
    },
  });

  const onSubmitForm = (data: FormInputs) => {
    onSubmit(data);
    if (!initialData) {
      reset();
    }
  };

  const btnText = initialData ? "Update Task" : "Create Todo";
  const bgColor = initialData ? theme.palette.background.secondary : undefined;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmitForm)}
      width={"100%"}
      pb={2}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Input
        label="Task Name:"
        name="title"
        register={register}
        error={!!errors.title}
        errorMessage={errors.title?.message}
        placeholder="Enter task name"
        required
        customBgColor={bgColor}
      />
      <Input
        label="Task Description:"
        name="description"
        register={register}
        error={!!errors.description}
        errorMessage={errors.description?.message}
        placeholder="Enter task description"
        multiline
        rows={3}
        required
        customBgColor={bgColor}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          bgcolor: "#ffffff",
          height: "52px",
        }}
      >
        {btnText}
      </Button>
    </Box>
  );
}
