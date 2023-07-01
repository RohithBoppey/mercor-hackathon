const otp_router = require("express").Router();
const TempStudent = require("../models/Temp");
const Student = require("../models/Student");

otp_router.get("/verify", async (req, res) => {
  let id = req.query.id;
  TempStudent.findById(id)
.then((user) => {
    delete user._id
    console.log(user)
        Student({
            fullname : user.fullname,
            gender : user.gender,
            email : user.email,
            year : user.year,
            password : user.password
        })
          .save()
          .then(() => {
            TempStudent.findOneAndDelete({email : user.email})
            .then(() => {
                res.send("Verification successfull");
            })
          })
          .catch((err) => {
            res.send("Unable to verify your account");
          });
    })
    .catch(() => {
      res.send("Invalid Verification Link");
    });
});

module.exports = otp_router;
