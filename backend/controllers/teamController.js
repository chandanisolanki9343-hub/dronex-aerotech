import Team from "../models/Team.js";

// Get All Members
export const getTeam = async (req, res) => {
  try {
    const members = await Team.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      members,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add Member
export const addMember = async (req, res) => {
  try {
    const member = await Team.create(req.body);

    res.status(201).json({
      success: true,
      member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Member
export const updateMember = async (req, res) => {
  try {
    const member = await Team.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Member
export const deleteMember = async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Member Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
