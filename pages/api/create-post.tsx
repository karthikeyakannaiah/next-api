import clientPromise from "../../lib/mongodb";
interface upvoteSchema{
    by: String
}
interface commentSchema{
    by: String,
    commentedAt: Date,
    comment: String,
    username: String
}
interface postSchema {
    title: String,
    content: String,
    createdAt: Date,
    upvotes: upvoteSchema[],
    updvotedPosts: any[],
    comments: commentSchema[],
    postedBy: String,
    username: String
}
export default async function(req:any,res:any) {
    try {
        const client = await clientPromise;
        const db = client.db("testdb1")
        const posts = db.collection("posts")

        let post:postSchema = {
            title: req.body.title,
            content: req.body.content,
            createdAt: new Date,
            upvotes: [],
            updvotedPosts: [],
            comments: [],
            postedBy: req.body.id,
            username: req.body.username
        }
        await posts.insertOne(post)
        res.send({status: true, message:"Successful", post:post}).status(201)

    } catch (e:any) {
        res.send({status: false, message:e.message}).status(500)
    }
}