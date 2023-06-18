import Order from "@/models/Order"
import BankUser from "@/models/BankUser"
import Transaction from "@/models/Transaction"

export default function handler(req, res) {
    let order=req.body
    BankUser.findOne({email:req.body.user.bank.email}).then(account=>{
      if(account.balance<14000*order.cproduct1+24000*order.cproduct2+60000*order.cproduct3){
        res.status(500).json({error:"Error message!"})
      }
      else{
        let from=account.email
        let to="ecommerce@example.com"
        let amount=14000*order.cproduct1+24000*order.cproduct2+60000*order.cproduct3
        let time=new Date().toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          });
        const newtransaction = new Transaction({to,from,amount,time});
        newtransaction.save().then(result=>{
          BankUser.findOneAndUpdate(
            { email: req.body.user.bank.email },
            { $inc: { balance: -amount } },
            { new: true }
            )
            .then((user) => {
              BankUser.findOneAndUpdate(
                { email: "ecommerce@example.com"},
                { $inc: { balance: 1000 } },
                { new: true }
                ).then(user=>{
                  BankUser.findOneAndUpdate(
                    { email: "seller@example.com"},
                    { $inc: { balance: amount-1000 } },
                    { new: true }
                    ).then(user=>{
                      const newtransaction2 = new Transaction({to:"seller@example.com",from:"ecommerce@example.com",amount:amount-1000,time})
                      newtransaction2.save().then(trn=>
                        {console.log(trn)
                          const order=new Order({
                            name: req.body.name,
                            address:req.body.address,
                            phone: req.body.phone,
                            cproduct1: req.body.cproduct1,
                            cproduct2: req.body.cproduct2,
                            cproduct3: req.body.cproduct3,
                            email: req.body.email,
                            time: time,
                            transaction_id: trn._id
                        })
                        order.save().then(resorder=>{

                          res.status(200).json(resorder)
                        })
                    }) 
                })
            })
          
          })
             
        }).catch(error=>{
          console.log(error)
          res.status(500).json({})
        })
      }
      console.log(account)
    })
    //console.log(req.body)
  }
  