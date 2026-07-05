import mongoose from "mongoose";
import dns from "dns";

// Override default DNS servers for Node's internal resolver (c-ares)
// only on local environments to prevent querySrv ECONNREFUSED errors.
// On Render, we use the default system DNS resolver.
if (!process.env.RENDER) {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
}

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

export default connectDB;