import clientPromise from "../../lib/mongodb";
export default async function(req:any,res:any){
    try {
        const client = await clientPromise;
        const db = client.db("testdb1")
        const users = db.collection("superusers")
        const user:any = await users.findOne({username:req.body.username})
        res.send(req.body.password)
    } catch (e:any) {
        console.log(e.message)
    }
}