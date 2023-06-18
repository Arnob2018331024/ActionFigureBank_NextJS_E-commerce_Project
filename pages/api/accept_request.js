// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Order from "@/models/Order"

export default function handler(req, res) {
  Order.findOneAndUpdate(
    { _id:req.body._id},
    { status:"delivered" },
    { new: true }
    ).then(order=>{
      res.status(200).json(order)
    }).catch(e=>{
      res.status(200).json(req.body)
    })
      
    
  }
  