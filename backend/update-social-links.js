import "dotenv/config";
import mongoose from "mongoose";
import Team from "./models/Team.js";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const updates = [
  {
    nameMatch: /Yashwant/i,
    updates: {
      linkedin: "https://www.linkedin.com/in/dr-yashwant-sawle-b3139921/",
      github: ""
    }
  },
  {
    nameMatch: /Parth/i,
    updates: {
      linkedin: "",
      github: ""
    }
  },
  {
    nameMatch: /Rishabh/i,
    updates: {
      linkedin: "",
      github: ""
    }
  },
  {
    nameMatch: /Harsh/i,
    updates: {
      linkedin: "https://www.linkedin.com/in/harsh-vardhan-kaushal-84212b317?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      github: "https://github.com/coolharsh408"
    }
  },
  {
    nameMatch: /Aryan Bhadoriya/i,
    updates: {
      linkedin: "",
      github: ""
    }
  },
  {
    nameMatch: /Aryan Narwariya/i,
    updates: {
      linkedin: "",
      github: ""
    }
  },
  {
    nameMatch: /Vaishnavi/i,
    updates: {
      linkedin: "",
      github: ""
    }
  },
  {
    nameMatch: /Kirti/i,
    updates: {
      linkedin: "https://www.linkedin.com/in/kirti-shukla-33492a349",
      github: ""
    }
  }
];

const runUpdates = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");

    for (const item of updates) {
      const result = await Team.updateMany(
        { name: item.nameMatch },
        { $set: item.updates }
      );
      console.log(`Updated members matching ${item.nameMatch}: ${result.modifiedCount} modified.`);
    }

    console.log("All team social links successfully updated in MongoDB!");
  } catch (err) {
    console.error("Error updating team links:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
};

runUpdates();
