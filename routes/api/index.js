const router = require("express").Router();
const authRoutes = require("./auth");
const dbRoutes = require("./db");
const keysRoutes = require("./keys");
const awsRoutes = require("./aws");

// auth routes
router.use("/auth/", authRoutes);

// db routes
router.use("/db/", dbRoutes);

// google routes
router.use("/keys/", keysRoutes);

// aws routes
router.use("/aws/", awsRoutes);

module.exports = router;
