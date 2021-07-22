module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      description: String,
      employeeCount: Number,
      establishYear: String,
      founder: String,
      headQuater: String,
      logo:String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Profile = mongoose.model("profile", schema);
  return Profile;
};
