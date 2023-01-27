import clientPromise from "../../lib/mongodb";
const bcrypt = require("bcrypt")

async function handler(req:any,res:any){
    try {
        const client = await clientPromise;
        const db = client.db("testdb1")
        const users = db.collection("superusers")
        const user:any = await users.findOne({username:req.body.username})
        if (user != null){
            let match = await bcrypt.compare(req.body.password, user.password)
            if(match){
                res.send({login:true, id: user._id})
            }else{
                res.send({login:false, message:"login failed, password doesn't match"})
            }
        } else{
            res.sendStatus(400).send("cannot find user")
        }
    } catch (e:any) {
        res.send({login:false, message:e.message}).status(500)
    }
}
export default handler