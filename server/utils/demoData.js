import Customer from "../models/Customer.js";
import Expense from "../models/Expense.js";
import Trip from "../models/Trip.js";

export async function seedDemoData(user) {
  const customers = await Customer.insertMany([
    { name: "Olivia Martin", email: "olivia@example.com", company: "Northstar Studio", owner: user._id },
    { name: "James Chen", email: "james@example.com", company: "Brightside Labs", owner: user._id },
    { name: "Ava Patel", email: "ava@example.com", company: "Fieldwork Co.", owner: user._id }
  ]);

  await Expense.insertMany([
    {
      description: "Client kickoff lunch",
      category: "Meals",
      amountPaise: 6840,
      date: new Date(),
      customer: customers[0]._id,
      owner: user._id
    },
    {
      description: "Design software subscription",
      category: "Software",
      amountPaise: 2499,
      date: new Date(Date.now() - 86400000 * 2),
      customer: customers[1]._id,
      owner: user._id
    },
    {
      description: "Train to project site",
      category: "Travel",
      amountPaise: 5375,
      date: new Date(Date.now() - 86400000 * 5),
      customer: customers[2]._id,
      owner: user._id
    },
    {
      description: "Workshop supplies",
      category: "Office",
      amountPaise: 3275,
      date: new Date(Date.now() - 86400000 * 9),
      customer: customers[0]._id,
      owner: user._id
    }
  ]);

  const trip = new Trip({
    name: "Goa weekend",
    owner: user._id,
    members: [
      { name: user.name },
      { name: "Ravi Kumar" },
      { name: "Neha Singh" }
    ]
  });
  trip.expenses.push(
    {
      description: "Hotel booking",
      amountPaise: 1200000,
      paidBy: trip.members[0]._id,
      date: new Date(Date.now() - 86400000 * 4)
    },
    {
      description: "Fuel",
      amountPaise: 420000,
      paidBy: trip.members[1]._id,
      date: new Date(Date.now() - 86400000 * 3)
    },
    {
      description: "Group dinner",
      amountPaise: 300000,
      paidBy: trip.members[2]._id,
      date: new Date(Date.now() - 86400000 * 2)
    }
  );
  await trip.save();
}
