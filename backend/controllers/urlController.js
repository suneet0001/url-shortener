const Url = require("../models/Url");
const shortid = require("shortid");
const bcrypt = require("bcryptjs");

// CREATE
exports.createShort = async (req, res) => {
  try {
    const { url, custom, password, expiry } = req.body;

    let short = custom || shortid.generate();

    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const exists = await Url.findOne({ short });
    if (exists) return res.status(400).json({ msg: "Custom URL taken" });

    const newUrl = await Url.create({
      original: url,
      short,
      password: hashedPassword,
      expiry,
    });

    res.json({ short: newUrl.short });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// REDIRECT
exports.redirectUrl = async (req, res) => {
  try {
    const { short } = req.params;

    const url = await Url.findOne({ short });

    if (!url) return res.status(404).send("Not found");

    if (url.expiry && new Date() > new Date(url.expiry)) {
      return res.status(403).send("Link expired");
    }

    // 🔐 If password → redirect to frontend page
    if (url.password) {
      return res.redirect(`http://localhost:3000/password/${short}`);
    }

    url.clicks++;
    await url.save();

    res.redirect(url.original);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// VERIFY PASSWORD
exports.verifyPassword = async (req, res) => {
  try {
    const { short } = req.params;
    const { password } = req.body;

    const url = await Url.findOne({ short });

    if (!url) return res.status(404).send("Not found");

    const valid = await bcrypt.compare(password, url.password);

    if (!valid) return res.status(401).json({ msg: "Wrong password" });

    url.clicks++;
    await url.save();

    res.json({ redirect: url.original });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// ANALYTICS
exports.getAllUrls = async (req, res) => {
  const urls = await Url.find().sort({ createdAt: -1 });
  res.json(urls);
};

// DELETE
exports.deleteUrl = async (req, res) => {
  await Url.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};