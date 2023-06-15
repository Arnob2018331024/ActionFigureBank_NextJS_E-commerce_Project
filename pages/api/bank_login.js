export default function handler(req, res) {
    if(req.method=="POST")
        {
            console.log(req.body)
            let user=req.body
            if(user.email==="admin@gmail.com"&&user.password==="admin"){
                res.status(200).json({email:"admin@gmail.com",password:"admin",type:"admin"})
            }
            else
                res.status(200).json({})
        
        }
    

  }
  