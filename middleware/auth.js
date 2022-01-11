import jwt from "jsonwebtoken";

const secret = "haha";

const auth = async (req, res, next) => {
  try {
    console.log(req.headers.authorization)
    const token = req.headers.authorization.split(" ")[1]; //Bearer xxx, biar bearer nya gaikut

    let decodedData;

    if (token) {
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
