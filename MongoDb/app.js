import mongoose from "mongoose";
import express from "express";
import saveschema from "./model.js";
const app=express()
app.use(express.json());
const URI="mongodb+srv://sudharcruiser_db_user:sudhar1234@cloud-terminal.y3fdq8q.mongodb.net/?retryWrites=true&w=majority&appName=cloud-terminal";
try{
    mongoose.connect(URI).then(()=>{
        console.log("database connected");
    }).catch(e=>console.log(e));
}catch(e){
    console.log(e);
}
app.get('/read',async (req,res)=>{
    try{
        const finding=await saveschema.find();
        res.send(finding);
    }
    catch(e){
        console.log(e);
    }
})

app.post('/post',async(req,res)=>{
    const {id,task}=req.body;
    try{
        const posted=await saveschema.create({id:parseInt(id),task:task});
        if(posted){
            res.send("data posted");
        }
        else{
            res.send("not opsted");
        }
    }catch(e){}
})
app.put('/update/:id',async(req,res)=>{
    const id=parseInt(req.params.id);
    const updated=req.body.task;
    try{
        const finding=await saveschema.findOne({id:id});
        if(finding){
            await saveschema.updateOne({id:id,task:updated});
            res.send("updated");
        }
    }catch(e){}

})
app.delete('/delete/:id',async(req,res)=>{
    try{
    const id=parseInt(req.params.id);
    console.log(id);
    const finding=await saveschema.findOne({id:id});
    if(finding){
        await saveschema.deleteOne(finding);
        res.send("deleted");
    }
}   catch(e){}
})
app.listen(8080,()=>{
    console.log("server running.");
})