import { Router } from "express";
import { 
    createTask,
    fetchAllTask,
    updateTask,
    deleteTask
} from "../controllers/task.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/").post(createTask);
router.route("/").get(fetchAllTask);
router.route("/:id").patch(updateTask).delete(deleteTask)


export default router;