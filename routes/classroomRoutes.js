const { Router } = require("express");
const {
  handlerCreateClassRoom,
  getAllClassRooms,

  handleUpdateClassRoom,
  handleDeleteClassRoom,
} = require("../Controllers/classroomControllers");

const router = Router();

router.post("/new", handlerCreateClassRoom);

router.get("/all", getAllClassRooms);

router.route("/:id").put(handleUpdateClassRoom).delete(handleDeleteClassRoom);

module.exports = router;
