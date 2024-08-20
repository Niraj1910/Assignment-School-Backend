const mongoose = require("mongoose");

const timeTableSchema = new mongoose.Schema({
  subject: {
    type: String,
  },

  start_time: {
    type: String,
  },
  end_time: {
    type: String,
  },
});

const classroomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    time: {
      start_time: {
        type: String,
      },
      end_time: {
        type: String,
      },
    },
    days: {
      start_date: {
        type: Date,
      },
      end_date: {
        type: Date,
      },
    },
    subjects_time_table: [timeTableSchema],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    assigned_teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true }
);

const Classroom = mongoose.model("Classroom", classroomSchema);

module.exports = Classroom;
