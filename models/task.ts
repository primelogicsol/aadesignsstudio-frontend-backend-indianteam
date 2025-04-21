import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface ITask extends Document {
  title: string
  description: string
  status: "pending" | "in-progress" | "completed"
  createdAt: Date
  updatedAt: Date
}

const TaskSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for this task"],
      maxlength: [60, "Title cannot be more than 60 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description for this task"],
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
)

// Check if the model is already defined to prevent overwriting during hot reloads
export default (mongoose.models.Task as Model<ITask>) || mongoose.model<ITask>("Task", TaskSchema)
