import Subscriber from "../models/Subscriber.js";

// Subscribe
export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    const existingSubscriber = await Subscriber.findOne({
      email,
    });

    if (existingSubscriber) {
      return res.status(400).json({
        success: false,
        message: "Email already subscribed",
      });
    }

    const subscriber = await Subscriber.create({
      email,
    });

    res.status(201).json({
      success: true,
      message: "Subscribed successfully",
      subscriber,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Subscribers
export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      subscribers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Subscriber
export const deleteSubscriber = async (req, res) => {
  try {
    const subscriber = await Subscriber.findByIdAndDelete(
      req.params.id
    );

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: "Subscriber not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Subscriber removed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
