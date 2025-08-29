import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate("posts reels posts.author posts.comments saved saved.author story following");
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `get current user ${error}` });
  }
}

export const editProfile = async(req,res)=>{
  try {
    const {name,userName,bio,profession,gender} = req.body;
    const user = await User.findById(req.userId).select("-password")
    if(!user){
      return res.status(400).json({message:"user not found"})
    }

    const sameUserWithUserName = await User.findOne({userName}).select("-password");
    if(sameUserWithUserName && sameUserWithUserName._id != req.userId){
      return res.status(400).json({message:"username already exists"})
    }

    let profileImg;
    if(req.file){
      profileImg = await uploadOnCloudinary(req.file.path)
    }

    user.name=name;
    user.userName = userName;
    if(profileImg){
     user.profileImg=profileImg;
    }
    user.bio= bio;
    user.profession=profession;
    user.gender=gender
    
    await user.save();

    return res.status(200).json(user)

  } catch (error) {
    return res.status(500).json({ message: `profile error ${error}` });
  }
}

export const getProfile = async(req,res)=>{
  try {
    const userName = req.params.userName;
    const user = await User.findOne({userName}).select("-password").populate("posts reels followers following");
    if(!user){
      return res.status(400).json({message:"user not found"})
    }
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ message: `getprofile error ${error}` });
  }
}

export const suggestedUser = async(req,res) =>{
  try {
    const user = await User.find({_id:{$ne:req.userId}}).select("-password");
    return res.status(200).json(user)
  } catch (error) {
     return res.status(500).json({ message: `suggested user error ${error}` });
  }
}

export const follow = async(req,res)=>{
  try {
    const currentUserId = req.userId;
    const targetUserId = req.params.targetUserId;

    if(!targetUserId){
      return res.status(400).json({message:"target user is not found"})
    }
    if(currentUserId == targetUserId){
      return res.status(400).json({message:"user not follow itself"})
    }
    const currentUser = await User.findById(currentUserId)
    const targetUser = await User.findById(targetUserId)

    const isFollowing = currentUser.following.includes(targetUserId)
    //unfollow logic and follow lofic
    if(isFollowing){
      currentUser.following = currentUser.following.filter(id => id.toString() != targetUserId)
      targetUser.followers = targetUser.followers.filter(id => id.toString() != currentUserId)
      await currentUser.save()
      await targetUser.save()
      return res.status(200).json({message:"unfollow successfull"})
    }else{
      currentUser.following.push(targetUserId)
      targetUser.followers.push(currentUserId)
      await currentUser.save()
      await targetUser.save()
      return res.status(200).json({message:"follow successfull"})
    }
  } catch (error) {
    return res.status(500).json({ message: `suggested user error ${error}` });
  }
}

export const followingList = async(req,res)=>{
  try {
    const result = await User.findById(req.userId)
    return res.status(200).json(result?.following)
  } catch (error) {
     return res.status(500).json({ message: `followinglist error ${error}` });
  }
}

export const search = async(req,res)=>{
  try {
    const keyword = req.query.keyword;
    if(!keyword){
      return res.status(400).json({message:"keyword is required"})
    }
    const users = await User.find({
      $or:[
        {userName:{$regex:keyword,$options:"i"}},
        {name:{$regex:keyword,$options:"i"}}
      ]
    }).select("-password")

    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json({ message: `search error ${error}` });
  }
}