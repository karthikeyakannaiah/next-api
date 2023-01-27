export default async function(req:any,res:any){
    if(req.body.login){
        res.send({login:"false", _id: null,message:"Logout Succesful"})
    }
    else {
        res.send({login:"false",message:"You haven't Logged in yet."})
    }
}