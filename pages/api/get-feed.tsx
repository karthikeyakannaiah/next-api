import clientPromise from "../../lib/mongodb";
export default async function(req:any,res:any){
    try{
        const client = await clientPromise;
        const db = client.db("testdb1")
        const posts = db.collection("posts")
        
        const feed = await posts.find().sort({createdAt:-1}).toArray()

        res.send({message:"feed fetched.",feed:feed}).status(200)
    } catch (e:any){
        res.send({message:e.message}).status(500)
    }
}