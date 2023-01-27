import clientPromise from "../../lib/mongodb";
export default async function(req:any,res:any){
    try {
        const client = await clientPromise;
        const db = client.db("testdb1")
        const posts = db.collection("posts")
        let postsByUser = await posts.find({postedBy:req.body.id}).sort({createdAt:-1}).toArray()
        res.send({message:"posts by user fetched.",postsByUser:postsByUser}).status(200)
    } catch (e:any) {
        res.send({message:e.message}).status(500)
    }
}