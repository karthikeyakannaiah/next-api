import { any } from "webidl-conversions";
import clientPromise from "../../lib/mongodb";
const bcrypt = require("bcrypt")
interface superusers {
    _id ?: any,
    username: String,
    password: String
}
async function handler(req:any,res:any){
    try {
        const client = await clientPromise;
        const db = client.db("testdb1")
        const users = db.collection("superusers")

        const hashedPassword = await bcrypt.hash(req.body.password.toString(), 10)
        let user:superusers = {
            username : req.body.username,
            password : hashedPassword
        }
        await users.insertOne(user)
        let forId = await users.findOne({username:user.username})
        res.send({login:true, id: user._id}).status(201)
    } catch (e:any) {
        console.log(e.message)
        res.send({login:false}).status(500)
    }
}
export default handler