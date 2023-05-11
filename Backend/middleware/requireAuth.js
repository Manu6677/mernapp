/**
  -Make a middle ware function with (req, res, next)
   -Grab the authorization from req.headers
  IMP  -Check the authorization is valid or not (because header m authorization nhi hoga toh error milegi)
     -If the authorization is valid then take the second array via Split 
    
   
    => try
     -Now take the string which come from authorization (req headers) and take your SECRET string and verify both
      -If they are same then take {_id} from it
     -Now check that id exist in the database 
      then next() [means eske baad ab aage jao baki GET, POST, etc ke routes pr]

     => catch
     -error dedo agr nhi hai toj
         
 */

const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  console.log("inside requireAuth");

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET); // this return payload after verify so we grab the _id from payload

    // use this _id to find details in database
    req.user = await User.findOne({ _id }).select("_id");
    console.log("req.user ", req.user);

    // console.log(userReq);

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = requireAuth;
