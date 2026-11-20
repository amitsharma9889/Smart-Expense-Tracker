import "dotenv/config";
import mongoose from "mongoose";
import Customer from "./models/Customer.js";
import Expense from "./models/Expense.js";
import Trip from "./models/Trip.js";
import User from "./models/User.js";
import bcrypt from "bcryptjs";
import { seedDemoData } from "./utils/demoData.js";

try {
  await mongoose.connect(
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/expense-tracker"
  );

  await Expense.deleteMany({});
  await Customer.deleteMany({});
  await Trip.deleteMany({});

  const demoPasswordHash = await bcrypt.hash("Demo1234!", 12);
  const demoUser = await User.findOneAndUpdate(
    { email: "amit@example.com" },
    { name: "Amit Sharma", email: "amit@example.com", passwordHash: demoPasswordHash },
    { new: true, upsert: true, runValidators: true }
  );

  await seedDemoData(demoUser);

  console.log("Added demo customers, expenses, and a Goa group trip.");
  console.log("Demo sign-in: amit@example.com / Demo1234!");
} catch (error) {
  console.error("Could not seed the database:", error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
