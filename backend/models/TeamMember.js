import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    position: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      default: "Dronx AeroTech",
    },

    bio: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    github: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const TeamMember = mongoose.model("TeamMember", teamMemberSchema);

export default TeamMember;
