import mongoose from "mongoose";

const schema = new mongoose.Schema({
    id:{type:Number,required:true},
    task:{type:String,required:true}
});

const saveschema=mongoose.model('taskmanager',schema);

export default saveschema;