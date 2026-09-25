export type TaskCategory = "Work" | "Personal" | "Urgent";

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string; // ISO date string, e.g. "2026-10-02"
  category: TaskCategory;
  completed: boolean;
  createdAt: string;
}

export type NewTaskInput = Omit<Task, "id" | "createdAt">;

export const Categories: TaskCategory[] = ["Work", "Personal", "Urgent"];

export const styles: Record<TaskCategory, { text: string; ring: string }> = {
  Work: {
    text: "text-[#6C4CE0]",
    ring: "ring-[#6C4CE0]/30",
  },
  Personal: {
    text: "text-[#3FA796]",
    ring: "ring-[#3FA796]/30",
  },
  Urgent: {
    text: "text-[#E0654C]",
    ring: "ring-[#E0654C]/30",
  },
};
