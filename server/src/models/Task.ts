import mongoose, { Schema, Document, Types } from "mongoose";
import { TaskCategory, VALID_CATEGORIES } from "../types/task";

export interface ITask extends Document {
  title: string;
  description: string;
  dueDate: Date;
  category: TaskCategory;
  completed: boolean;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
    category: {
      type: String,
      enum: VALID_CATEGORIES,
      required: [true, "Category is required"],
    },
    completed: {
      type: Boolean,
      default: false,
    },

    // Task Security
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
