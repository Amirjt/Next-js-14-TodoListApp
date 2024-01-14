import mongoose from "mongoose";
import User from "./User";

const { Schema } = mongoose

const TodoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userEmail: {
        type: Schema.Types.String,
        ref : "User",
        required: true,
    },
} , {
    timestamps: true
})

const Todo = mongoose.models.Todo || mongoose.model("Todo" , TodoSchema)

export default Todo