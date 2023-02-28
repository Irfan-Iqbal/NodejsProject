
const jwt = require('jsonwebtoken');
const sec = 'shhhhhhhhhhhhhhhhhhhtttttttttttttttttttyyyyyyyyyyyyyy';
const User = require('../Model/Auth.model')



const login = (req,res) =>{
    // {firstname,lastnme} = req.body
    const email = req.body.email
    const password = req.body.password
User.findOne( {email,password }).then((user)=>{
    if(user){
    const token = jwt.sign({
        email:email,
        password:password
     },sec)
     res.status(200).json({
         maessage: "login successful",
         token
     })
}else{
        res.status(404).json({
            message:"plese check your  name and password"
     })
    }
   })
 }
// update userdata
const updateuser = function (req, res) {
    User.findOneAndUpdate({firstname: "Ahmed"},{$set: {lastname: "Qureshi"}}, {returnNewDocument: true}).then(()=>{
        return res.status(200).json({
            message: "updated successfully !",
        }).catch(()=>{
            return res.status(404).json({
                message: "not successfull!",
            })
        })
    })
}

// MAking token 
// const login =  (req, res)=> {
//     let email = req.body.email;
//     if (users.find(ele => ele.email == email)) {
//         // token generating assign 1)body/payload 2) sec key
//         var token = jwt.sign({
//             email: email
//             // sec key = sec upside
//         }, sec);
//         return res.status(200).json({
//             message: "login successfully !",
//             // showing token
//             token
//         })
//     } else {
//         return res.status(401).json({
//             message: "Please Check your Email or Password"
//         })
//     }
// }



module.exports= {login,updateuser}