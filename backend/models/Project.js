import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        image: {
            type: String,
            default: "",
        },

        technologies: {
            type: [String],
            default: [],
        },

        status: {
            type: String,
            enum: ["Ongoing", "Completed", "Upcoming"],
            default: "Ongoing",
        },
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;