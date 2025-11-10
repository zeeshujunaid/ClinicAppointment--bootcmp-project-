const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Generate Token
const generateToken = (id, fullname, email, role) => {
  return jwt.sign({ id, fullname, email, role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// patients signup
exports.registerPatient = async (req, res) => {
  const { fullname, email, password, phone, image, age, gender } = req.body;

  if (!fullname || !email || !password || !phone || !age || !gender || !image) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({
      fullname,
      email,
      password,
      phone,
      image,
      role: "patient",
      age,
      gender,
    });

    res.status(201).json({
      message: "Patient registered successfully",
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        role: newUser.role,
        gender: newUser.gender,
        image: newUser.image,
      },
      token: generateToken(
        newUser._id,
        newUser.fullname,
        newUser.email,
        newUser.role
      ),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.createUserByAdmin = async (req, res) => {
  const {
    fullname,
    email,
    password,
    phone,
    image,
    gender,
    role,
    specialization,
    experience,
    fees,
    department,
    shift,
  } = req.body;

  if (
    !fullname ||
    !email ||
    !password ||
    !phone ||
    !role ||
    !image ||
    !gender
  ) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  try {
    // Only admin can register users
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Only admin can create users." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const newUser = await User.create({
      fullname,
      email,
      password,
      phone,
      image,
      gender,
      role,
      specialization,
      experience,
      fees,
      department,
      shift,
    });

    res.status(201).json({
      message: `${
        role.charAt(0).toUpperCase() + role.slice(1)
      } created successfully`,
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// login for everyone
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please enter email and password" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        phone: user.phone,
        gender: user.gender,
        address: user.address,
        age: user.age,
        createdAt: user.createdAt,
        image: user.image,
      },
      token: generateToken(user._id, user.fullname, user.email, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// fetching all users for admin
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    res.status(200).json({
      message: "All users fetched successfully",
      total: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// fetching only doctors
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" });
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// fetching all patients
exports.getPatients = async (req, res) => {
  try {
    const doctors = await User.find({ role: "patient" });
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// fetching all staff
exports.getStaff = async (req, res) => {
  try {
    const doctors = await User.find({ role: "staff" });
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// admin create
exports.createAdmin = async (req, res) => {
  try {
    const { fullname, email, password, phone, image } = req.body;

    if (!fullname || !email || !password || !phone || !image) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin with this email already exists" });
    }

    // Create admin user
    const newAdmin = await User.create({
      fullname,
      email,
      password,
      phone,
      image,
      role: "admin",
    });

    res.status(201).json({
      message: "Admin created successfully",
      admin: {
        id: newAdmin._id,
        fullname: newAdmin.fullname,
        email: newAdmin.email,
        role: newAdmin.role,
      },
      token: generateToken(
        newAdmin._id,
        newAdmin.fullname,
        newAdmin.email,
        newAdmin.role
      ),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
