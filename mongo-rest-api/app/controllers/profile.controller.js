const db = require("../models");
const Profile = db.profile;

// Create and Save a new Profile
exports.create = (req, res) => {
  console.log('====>req',req.body);
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Profile
  const ProfileInfo = new Profile({
    title: req.body.title,
    description: req.body.description,
    employeeCount: req.body.employeeCount,
    establishYear: req.body.establishYear,
    founder: req.body.founder,
    headQuater: req.body.headQuater,
    logo:req.body.logo
  });

  // Save Profile in the database
  ProfileInfo
    .save(ProfileInfo)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Profile."
      });
    });
};

// Retrieve all profile from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Profile.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving profile."
      });
    });
};

// Find a single Profile with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Profile.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Profile with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Profile with id=" + id });
    });
};

// Update a Profile by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Profile.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Profile with id=${id}. Maybe Profile was not found!`
        });
      } else res.send({ message: "Profile was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Profile with id=" + id
      });
    });
};

// Delete a Profile with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Profile.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Profile with id=${id}. Maybe Profile was not found!`
        });
      } else {
        res.send({
          message: "Profile was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Profile with id=" + id
      });
    });
};

// Delete all profile from the database.
exports.deleteAll = (req, res) => {
  Profile.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} profile were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all profile."
      });
    });
};

// Find all published profile
exports.findAllPublished = (req, res) => {
  Profile.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving profile."
      });
    });
};
