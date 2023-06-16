import BankUser from "@/models/BankUser"

export default function handler(req, res) {
    if(req.method=="POST")
        {
            console.log(req.body)
            let user=req.body
            if(user.email==="admin@gmail.com"&&user.password==="admin"){
                res.status(200).json({email:"admin@gmail.com",password:"admin",type:"admin"})
            }
            else
                BankUser.find({email:user.email,password:user.password}).then(result=>{
                    console.log(result)
                    if(result[0].email!=null)
                        {
                        res.status(200).json({name:result[0].name,email:result[0].email,balance:result[0].balance,type:"general"})}
                    else
                        res.status(200).json({error:"Wrong username password!"})
                })
        
        }
    

  }
  