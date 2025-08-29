import uploadOnCloudinary from "../config/cloudinary.js";
import Story from "../models/story.model.js";
import User from "../models/user.model.js";

export const uploadStory = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (user.story) {
      await Story.findByIdAndDelete(user.story);
      user.story = null;
    }
    const { mediaType } = req.body;
    let media;
    if (req.file) {
      media = await uploadOnCloudinary(req.file.path);
    } else {
      return res.status(400).json({ message: "media is required" });
    }
    const story = await Story.create({
      media,
      mediaType,
      author: req.userId,
    });
    user.story = story._id;
    await user.save();
    const populateStory = await Story.findById(story._id)
      .populate("author", "name userName profileImg")
      .populate("viewers", "name userName profileImg");
    console.log(populateStory);
    return res.status(201).json(populateStory);
  } catch (error) {
    return res.status(500).json({ message: `upload story error ${error}` });
  }
};

export const viewerStory = async(req,res)=>{
  try {
    const storyId = req.params.storyId;
    const story = await Story.findById(storyId);
    if(!story){
      res.status(400).json({message:"story not found"})
    }
    const viewersId = story.viewers.map(id=> id.toString())
    if(!viewersId.includes(req.userId.toString())){
      story.viewers.push(req.userId)
      await story.save()
    }
    const populateStory = await Story.findById(story._id)
      .populate("author", "name userName profileImg")
      .populate("viewers", "name userName profileImg");
    console.log(populateStory);
    return res.status(201).json(populateStory);
  } catch (error) {
     return res.status(500).json({ message: `viewer story error ${error}` });
  }
}

export const getStoryByUsername = async(req,res)=>{
  try {
    const userName = req.params.userName;
    const user = await User.findOne({userName})
    if(!user){
      res.status(400).json({message:"user not found"})
    }
    const story = await Story.find({
      author:user._id
    }).populate("viewers author")
    res.status(200).json(story)
  } catch (error) {
    return res.status(500).json({ message: `getstorybyusername error ${error}` });
  }
}

export const getAllStory = async(req,res)=>{
  try {
    const currentUser = await User.findById(req.userId);
    const followingIds = currentUser.following;
    const stories = await Story.find({
      author:{$in : followingIds}
    }).populate("viewers author").sort({createdAt:-1})
    return res.status(200).json(stories)
  } catch (error) {
     return res.status(500).json({ message: `getallstory error ${error}` });
  }
}