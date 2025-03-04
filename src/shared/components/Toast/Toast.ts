import { toast } from "sonner";

export const customToast = (message: string, description: string, type: "success" | "error") => {
  return toast[type](`${message}!`, {
    description: description,
    duration: 4000,
  });
};
