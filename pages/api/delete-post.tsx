import clientPromise from "../../lib/mongodb";
const ObjectId = require('mongodb').ObjectId; 
export default async function (req: any, res: any) {
  try {
    const client = await clientPromise;
    const db = client.db("testdb1");
    const posts = db.collection("posts");
    const id = new ObjectId(req.body.postId)
    await posts.deleteOne({ _id: id });
    res.send({message:"post deleted"})
  } catch (e:any) {
    res.send({message:e.message}).status(500)
  }
}
