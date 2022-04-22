const mongoose =require("mongoose");

const showArtSchema = new mongoose.Schema(
    {
     art_name:{type:String,required:true},
     art_desc:{type:String,required:true},
     art_img:{type:String,required:true},
     price:{type:Number,required:true},
     category:{type:String,required:true},
     artist_name:{type:String,required:true},
     city:{type:String,required:true},
     phone:{type:Number,required:true,maxlength:10},
     email:{type:String,required:true},
     user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    },
    {
      versionKey:false,
      timestamps:true,
    }
);

const ShowArt = mongoose.model("showArt",showArtSchema);

module.exports=ShowArt;