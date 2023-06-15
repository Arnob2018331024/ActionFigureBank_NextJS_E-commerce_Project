export default function handler(req, res) {
    if(req.method=="POST")
        {
            console.log(req.body)
            let user=req.body.user
            user.balance=0
            res.status(200).json(user)
        
        }
    if(req.method=="DELETE"){
        let email=req.query.email
        res.status(200).json(email)
        console.log(email)
    }
    

  }