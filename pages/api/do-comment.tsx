import clientPromise from "../../lib/mongodb";

const ObjectId = require('mongodb').ObjectId; 
interface commentSchema{
    by: String,
    commentedAt: Date,
    comment: String,
    username: String
}
export default async function(req:any,res:any){
    try {
        const client = await clientPromise;
        const db = client.db("testdb1")
        const posts = db.collection("posts")
        let objectId = new ObjectId(req.body.postId);
        let post:any = await posts.findOne({_id:objectId})
        let comments = [...post.comments]
        let newComment:commentSchema = {
            by: req.body.currentUserId,
            commentedAt: new Date(),
            comment: req.body.comment,
            username: req.body.username
        }
        comments.push(newComment)
        // res.send(comments)
        await posts.updateOne({_id:objectId},{$set:{ comments:comments}})
        post = await posts.findOne({_id:objectId})
        res.send({message:"comment added",updatedPost:post})
    } catch (e:any) {
        res.send({message:e.message}).status(500)
    }
}