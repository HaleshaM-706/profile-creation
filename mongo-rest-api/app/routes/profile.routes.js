module.exports = app => {
  const profile = require("../controllers/profile.controller.js");

  var router = require("express").Router();

  // Create a new Profile
  router.post("/details", profile.create);

  // Retrieve all Profiles
  router.get("/profile-info", profile.findAll);


  // Retrieve a single Profile with id
  router.get("/:id", profile.findOne);

  // Update a Profile with id
  router.put("/:id", profile.update);

  // Delete a Profile with id
  router.delete("/:id", profile.delete);

  // Create a new Profile
  router.delete("/", profile.deleteAll);

  app.use("/api/profile", router);
};
