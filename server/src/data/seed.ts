import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/User";
import dns from "dns";

dotenv.config();

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const seedAdmin = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ connected to MongoDB for seeding");

    const existing = await User.findOne({ email: "admin@taskduty.com" });

    if (!existing) {
      // Password is hashed by the pre("save") hook in the User model
      await User.create({
        name: "Admin",
        email: "admin@taskduty.com",
        password: "admin12345",
        role: "admin",
      });
      console.log("⛑️ Admin user created:admin@taskduty.com ");
    } else if (existing.role !== "admin") {
      existing.role = "admin";
      await existing.save();
      console.log("⛑️ Existing user promoted to admin");
    } else {
      console.log("‼️ Admin user already exists");
    }

    console.log("\n 🎉 Database seeded successfully!");
    process.exit(0); // Exit successfully
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1); // Exit with error
  }
};

seedAdmin();
