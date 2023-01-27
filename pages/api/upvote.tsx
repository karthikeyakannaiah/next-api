import clientPromise from "../../lib/mongodb";
interface upvoteSchema{
    by: String
}
const ObjectId = require('mongodb').ObjectId; 
export default async function(req:any,res:any){
    try {
        const client = await clientPromise;
        const db = client.db("testdb1")
        const posts = db.collection("posts")
        let objectId = new ObjectId(req.body.postId);
        let post:any = await posts.findOne({_id:objectId})
        let upvotes = [...post.upvotes]
        if(upvotes.filter(u=>u.by===req.body.currentUserId).length != 0){
            res.status(406).send({status:true,message:"already upvoted"})
        }else {
            let upvote:upvoteSchema={
                by:req.body.currentUserId
            }
            upvotes.push(upvote)
            await posts.updateOne({_id:objectId},{$set:{ upvotes:upvotes}})
            post = await posts.findOne({_id:objectId})
            res.send({message:"upvote added",status:true,updatedPost:post}) 
        }
    } catch (e:any) {
        res.send({message:e.message}).status(500)
    }
}