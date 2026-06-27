import mongoose from "mongoose";

const recruitmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    fullName: {
      type: String,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    branch: {
      type: String,
    },
    department: {
      type: String,
    },

    year: {
      type: String,
      required: true,
    },

    skills: {
      type: String,
      default: "",
    },
    domain: {
      type: String,
      default: "",
    },

    message: {
      type: String,
    },
    reason: {
      type: String,
    },
    whyJoin: {
      type: String,
    },

    status: {
      type: String,
      enum: ["Pending", "Selected", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook using standard synchronous middleware signature (no next parameter needed if no async operation)
recruitmentSchema.pre("save", function() {
  if (this.name && !this.fullName) this.fullName = this.name;
  if (this.fullName && !this.name) this.name = this.fullName;

  if (this.branch && !this.department) this.department = this.branch;
  if (this.department && !this.branch) this.branch = this.department;

  if (this.message && !this.whyJoin) this.whyJoin = this.message;
  if (this.whyJoin && !this.message) this.message = this.whyJoin;
  if (this.message && !this.reason) this.reason = this.message;
  if (this.reason && !this.message) this.message = this.reason;

  if (this.domain && !this.skills) this.skills = this.domain;
  if (this.skills && !this.domain) this.domain = this.skills;
});

const Recruitment = mongoose.model("Recruitment", recruitmentSchema);

export default Recruitment;
