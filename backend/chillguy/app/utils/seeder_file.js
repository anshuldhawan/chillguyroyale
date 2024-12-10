const Users = require("../model/userModal");
const ADMIN_EMAIL = "admin@yopmail.com";
const ADMIN_PASSWORD = "Test@123";

const seedAdmin = async () => {
  try {
    // Check if an admin user already exists
    const adminUser = await Users.findOne({
      role: "admin",
      email: ADMIN_EMAIL,
    });

    if (!adminUser) {
      // Create the admin user
      const newAdmin = new Users({
        name: "Admin",
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        role: "admin",
      });

      await newAdmin.save();
      console.log("Admin user created successfully.");
    } else {
      console.log("Admin user already exists.");
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

module.exports = { seedAdmin };
