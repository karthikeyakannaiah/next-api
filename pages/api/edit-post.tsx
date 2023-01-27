import clientPromise from "../../lib/mongodb";

const ObjectId = require('mongodb').ObjectId; 
export default async function(req:any,res:any){
    try {
        const client = await clientPromise;
        const db = client.db("testdb1")
        const posts = db.collection("posts")
        let objectId = new ObjectId(req.body.postId);
        await posts.updateOne({_id:objectId},{$set:{ title:req.body.title,content:req.body.content}})
        let post = await posts.findOne({_id:objectId})
        res.send({message:"post edited",updatedPost:post})
    } catch (e:any) {
        res.send({message:e.message}).status(500)
    }
}