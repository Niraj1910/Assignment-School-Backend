const Classroom = require("../Models/ClassroomModel");

async function handlerCreateClassRoom(req, res) {
  try {
    const classroomData = req.body;

    classroomData.days.start_date = new Date(classroomData.days.start_date);

    classroomData.days.end_date = new Date(classroomData.days.end_date);

    const newClassRoom = await Classroom.create(classroomData);

    return res.status(200).json({
      message: "Classroom created successfully",
      classroom: newClassRoom,
    });
  } catch (error) {
    console.error("Server error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

async function getAllClassRooms(req, res) {
  try {
    const allClassRooms = await Classroom.find({})
      .populate("assigned_teacher", "-password -salt")
      .populate("students", "-password -salt");
    return res.status(200).json(allClassRooms);
  } catch (error) {
    console.error("Server error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

async function handleUpdateClassRoom(req, res) {
  try {
    const classroomId = req.params.id;

    const classroomUpdatedData = req.body;

    await Classroom.findByIdAndUpdate(classroomId, classroomUpdatedData);

    return res.status(200).json({
      message: "Subjects updated",
    });
  } catch (error) {
    console.error("Server error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

async function handleDeleteClassRoom(req, res) {
  try {
    const classroomId = req.params.id;

    await Classroom.findByIdAndDelete(classroomId);

    return res.status(200).json({
      message: "Subjects updated",
    });
  } catch (error) {
    console.error("Server error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

module.exports = {
  handlerCreateClassRoom,
  getAllClassRooms,
  handleUpdateClassRoom,
  handleDeleteClassRoom,
};
