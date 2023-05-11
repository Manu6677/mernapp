const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

/**
 Stactics method for login
  -First check the empty field is there in login
   -Email which is passed in fn get checked is it exist or not
     -If it exist in database then check it is matched via COMPARE(this compare return TRUE OR FALSE)
       -Matched then return else Error throw 

 */

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields not filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email !");
  }

  const match = await bcrypt.compare(password, user.password); // Return true or false (matched toh true wrna false)
  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
};

// statics method
userSchema.statics.signup = async function (email, password) {
  // validation before find mail => hash => create document of maail and password bc error ho toh aage nhi jai yahis wapis ho jai

  if (!email || !password) {
    throw Error("All fields not filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash }); // hash value of password( to store password in hash)

  return user; // remember to return it bc we call signup fn from else where and it return user for us
};

/**
 We create a statics signup method (signup is our given name) mongoose provide varuious method but you can create your own method to do things
  Here in signup method we passed user (email and password)

 Now to check that passed email and password present in database by ( findOne )
  If it is already present in database throw Error (although unique is there but we added our check too) throw Error bc we dont use res here 
   
 SALT: To salt password mean to add random string letter to password after it that hashed (but before salt happen to add extra layer of protection bc when 2 password same but there salt is diff so end up creating diff hash value)
 Generated salt by genSalt method (genSalt takes argument to add expensive salt more value more hard salt more takes more time to store)
  await used here is necessary it is designed as it takes time
    After having SALT value use hash method to hash password now (in hash method pass two arguement, password and salt [JO HASH KRNA HAI, USKI HI SALT VALUE])

  Now to store the email and password in database by crating its document
   REMEMBER TO have password value is hash now
 */

module.exports = mongoose.model("User", userSchema);
