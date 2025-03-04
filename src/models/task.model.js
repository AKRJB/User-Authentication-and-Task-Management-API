import mongoose, {Schema} from "mongoose";

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        status: {
            type: String,
            enum: ["pending", "in-progress", "completed"],
            default: "pending",
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    }, {timestamps: true}
)

export const Task = mongoose.model("Task", taskSchema);
