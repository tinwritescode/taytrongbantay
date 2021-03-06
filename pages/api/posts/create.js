import connectDB from "../../../middleware/mongodb";
import mongoose from "mongoose";
// import User from '../../models/user'; // use when populate user
import requireAuth from "../../../middleware/requireAuth";
import Post from "../../../models/PostModel";
import User from "../../../models/UserModel";
import jwt from "jsonwebtoken";
import readCookie from "../../../utils/readCookie";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      var { content, title, tags, slug, thumbnail, description, category } =
        req.body;

      if (!(content && title && tags && slug && description && category))
        throw "Xin hãy nhập đủ các trường.";

      var token = readCookie(req.headers.cookie, "ttbt_token");

      console.log("debug", token, process.env.JWT_SECRET);
      const user = jwt.verify(token, process.env.JWT_SECRET);

      const isAdmin = await User.findOne({
        id: user.id,
        admin: "admin",
      }).lean();

      if (!isAdmin) throw "Bạn không phải là admin";

      var post = await Post.create({
        content,
        title,
        tags,
        author: user.id,
        thumbnail: thumbnail ? thumbnail : "/images/no-thumbnail-medium.png",
        description,
        slug,
        category,
      });

      console.log(`[POST] Post ${title} created.`, post);
    } catch (e) {
      var error = e;
      res.status(200).json({ error: e });
    } finally {
      if (!error) res.status(200).json(post);
    }
  }
};

export default requireAuth(connectDB(handler));
