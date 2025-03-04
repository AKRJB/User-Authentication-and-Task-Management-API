import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Task } from "../models/task.model.js";
import {isValidObjectId} from "mongoose";


const createTask = asyncHandler(async(req, res) => {
    const { title, description, status } = req.body;
    const userId = req.user._id;

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID format");
    }

    if(!title){
        throw new ApiError(400, "task title is required")
    }

    const task = await Task.create({
        title,
        description,
        status,
        user: userId
    });

    res.status(201).json(new ApiResponse(201, task, "Task created successfully"));
});


const fetchAllTask = asyncHandler(async(req, res) => {

    const userId = req.user._id;

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID format");
    }

    const page  = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalTasks = await Task.countDocuments({ user: userId });

    if(totalTasks === 0){
        return res.status(200).json(new ApiResponse(200, "No tasks found!"))
    }

    const tasks = await Task.find({ user: userId })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });


    res.status(200).json(new ApiResponse(200, 
        {
            page,
            limit,
            totalTasks,
            totalPages: Math.ceil(totalTasks / limit),
            tasks 
        },
       "Tasks retrieved successfully"
    ));
})

const updateTask = asyncHandler(async(req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    if (!isValidObjectId(id)) {
        throw new ApiError(400, "Invalid task ID format");
    }

    const validStatuses = ["pending", "in-progress", "completed"];
    if (status && !validStatuses.includes(status)) {
        throw new ApiError(400, "Invalid status value. Allowed values are: pending, in-progress, completed");
    }

    const task = await Task.findByIdAndUpdate(
        id,
        { title, description, status },
        { new: true, runValidators: true }
    );


    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    res.status(200).json(new ApiResponse(200, task, "Task updated successfully"));
})

const deleteTask = asyncHandler(async(req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw new ApiError(400, "Invalid task ID format");
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    res.status(200).json(new ApiResponse(200, null, "Task deleted successfully"));
})

export { 
     createTask,
     fetchAllTask,
     updateTask,
     deleteTask
     }