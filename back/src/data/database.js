import mongoose from "mongoose";
import "dotenv/config";
import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

export async function ConnectDatabase()
{
    try
    {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB connected");
    }
    catch (error)
    {
        console.error("MongoDB connection error:", error);

        process.exit(1);
    }
}