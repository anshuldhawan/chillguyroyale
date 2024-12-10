const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Users = require("../model/userModal");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../../config/envs");
const { InvalidInputError } = require("../errors/invalid_input_error");
const { NotFoundError } = require("../errors/not_found_error");
const { UnauthorizedUserError } = require("../errors/unauthorized_user_error");
const { validateSignInFields } = require("../validators/user.validator");
const SolanaWeb3Helper = require("../utils/solana_helper");
const solanaWeb3 = new SolanaWeb3Helper();
class User {
  async login(req, res) {
    const {
      error: fielderror,
      value: { email, password },
    } = validateSignInFields(req.body);

    if (fielderror) {
      throw new InvalidInputError(
        fielderror.details[0].message,
        req.user?.id,
        req.params,
        req.body
      );
    }

    const user = await Users.findOne({
      email: email,
    }).lean();

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedUserError("Incorrect password");
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    delete user.password;
    return res.status(200).json({ user, token });
  }

  async userLogin(req, res) {
    const { publicKey, signature } = req.body;
    console.log(`Login called for: ${publicKey}`);
  
    if (!publicKey || !signature) {
      throw new InvalidInputError("Missing required fields.");
    }
  
    const verified = solanaWeb3.verifyPublicAddressForSignature(publicKey, signature);
    if (!verified) {
      throw new UnauthorizedUserError("Unauthorized User");
    }
  
    let user = await Users.findOne({ publicKey: publicKey }).lean();
  
    if (!user) {
      user = new Users({
        publicKey: publicKey,
        credits: 0,
        name: "Unknown"
      });
      
      await user.save();
      console.log(`New user created: ${publicKey}`);
    }
  
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
  
    delete user.password;
  
    return res.status(200).json({ user, token });
  }
  
  async getUser(req, res) {
    const userId = req.auth.id;

    const user = await Users.findById(userId).select("-password").lean();
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return res.status(200).json({ user });
  }

  async updateName(req, res) {
    const userId = req.auth.id;
    const { name } = req.body;

    if (!name || name.trim() === "") {
      throw new InvalidInputError("Name cannot be empty.");
    }

    const user = await Users.findById(userId);
    if (!user) {
      throw new UnauthorizedUserError("User not found.");
    }
    user.name = name;
    await user.save();

    return res.status(200).json({ message: "Name updated successfully", user });
  }

  async changePassword(req, res) {
    const userId = req.auth.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      throw new InvalidInputError(
        "Both current and new passwords are required."
      );
    }
    const user = await Users.findById(userId);
    if (!user) {
      throw new UnauthorizedUserError("User not found.");
    }
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordCorrect) {
      throw new UnauthorizedUserError("Incorrect password.");
    }
    user.password = newPassword;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully." });
  }
}

module.exports = User;
