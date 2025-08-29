import uploadOnCloudinary from "../config/cloudinary.js";
import Reel from "../models/reels.model.js";
import User from "../models/user.model.js";

export const uploadReel = async (req, res) => {
  try {
    const { caption } = req.body;
    let media;
    if (req.file) {
      media = await uploadOnCloudinary(req.file.path);
    } else {
      return res.status(400).json({ message: "media is required" });
    }
    const reel = await Reel.create({
      caption,
      media,
      author: req.userId,
    });
    const user = await User.findById(req.userId);
    user.reels.push(reel._id);
    await user.save();
    const populateReel = await Reel.findById(reel._id).populate(
      "author",
      "name userName profileImg"
    );
    return res.status(201).json(populateReel);
  } catch (error) {
    return res.status(500).json({ message: `upload reel error ${error}` });
  }
};

export const reelLike = async (req, res) => {
  try {
    const reelId = req.params.reelId;
    const reel = await Reel.findById(reelId);
    if (!reel) {
      return res.status(400).json({ message: "reel are not found" });
    }
    const alreadyLiked = reel.likes.some(
      (id) => id.toString() == req.userId.toString()
    );
    if (alreadyLiked) {
      reel.likes = reel.likes.filter(
        (id) => id.toString() !== req.userId.toString()
      );
    } else {
      reel.likes.push(req.userId);
    }
    await reel.save();
    await reel.populate("author", "name userName profileImg");
    io.emit("likeReel", {
      reelId: reel._id,
      likes: reel.likes,
    });
    return res.status(200).json(reel);
  } catch (error) {
    return res.status(500).json({ message: `reel like error ${error}` });
  }
};

export const reelComment = async (req, res) => {
  try {
    const { message } = req.body;
    const reelId = req.params.reelId;
    const reel = await Reel.findById(reelId);
    if (!reel) {
      return res.status(400).json({ message: "reel are not found" });
    }
    reel.comments.push({
      author: req.userId,
      message,
    });
    await reel.save();
    await reel.populate("author", "name userName profileImg");
    await reel.populate("comments.author");
    io.emit("commentedReel", {
      reelId: reel._id,
      comments: reel.comments,
    });
    return res.status(200).json(reel);
  } catch (error) {
    return res.status(500).json({ message: `reel comment error ${error}` });
  }
};

export const getAllReels = async (req, res) => {
  try {
    const reel = await Reel.find({}).populate(
      "author",
      "name userName profileImg"
    );
    return res.status(200).json(reel);
  } catch (error) {
    return res.status(500).json({ message: `getall reel error ${error}` });
  }
};
