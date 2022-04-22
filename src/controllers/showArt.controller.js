const express = require("express");

const router = express.Router();

const ShowArt = require("../models/showArt.model");

//api to post art
router.post("", async (req,res) => {
    try{
        const showart=await ShowArt.create(req.body);
        return res.send(showart);
    }catch(err){
      return res.send(err.message);
    } 
});

//api to get all art
router.get("", async (req,res) => {
    try{
        const page = req.query.page || 1;
        const size = req.query.size || 6;
        const showArt=await ShowArt.find()
        .skip((page -1)*size)
        .limit(size)
        .populate({path:"user_id"})
        .lean().exec();
 
        const totalPages = Math.ceil(
            (await ShowArt.find().countDocuments())/size
        );

        return res.send({showArt,totalPages});
    }catch(err){
      return res.send(err.message);
    } 
});

//api to filter art category 
router.get("/category", async (req,res) => {
    try{
        const page = req.query.page || 1;
        const size = req.query.size || 6;
        const category = req.query.category;
        const showArt=await ShowArt.find({category:category})
        .skip((page -1)*size)
        .limit(size)
        .lean().exec();
 
        const totalPages = Math.ceil(
            (await ShowArt.find({category:category}).countDocuments())/size
        );

        return res.send({showArt,totalPages});
    }catch(err){
      return res.send(err.message);
    } 
});

//api to filter city
router.get("/city", async (req,res) => {
    try{
        const page = req.query.page || 1;
        const size = req.query.size || 6;
        const city = req.query.city;
        const showArt=await ShowArt.find({city:city})
        .skip((page -1)*size)
        .limit(size)
        .lean().exec();
 
        const totalPages = Math.ceil(
            (await ShowArt.find({city:city}).countDocuments())/size
        );

        return res.send({showArt,totalPages});
    }catch(err){
      return res.send(err.message);
    } 
});

//api to filter artist Name
router.get("/artist", async (req,res) => {
    try{
        const page = req.query.page || 1;
        const size = req.query.size || 6;
        const artist_name = req.query.artist_name;
        const showArt=await ShowArt.find({artist_name:artist_name})
        .skip((page -1)*size)
        .limit(size)
        .lean().exec();
 
        const totalPages = Math.ceil(
            (await ShowArt.find({artist_name:artist_name}).countDocuments())/size
        );

        return res.send({showArt,totalPages});
    }catch(err){
      return res.send(err.message);
    } 
});

//api to delete art
router.delete("/:id", async (req, res) => {
    try {
      const showArt= await ShowArt.findByIdAndDelete(req.params.id);
  
      res.status(200).json({ msg: "Art deleted successfully",showArt});
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

//api to update art details
router.patch("/:id", async (req, res) => {
    try {
      const showArt = await ShowArt.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
      });
  
      res.status(200).json({ msg: "Art updated successfully", showArt });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  //api to get single art
router.get("/:id", async (req, res) => {
  try {
    const showArt = await ShowArt.findById(req.params.id);
    return res.send(showArt);
  } catch (err) {
    return res.send(err.message);
  }
});

module.exports=router;