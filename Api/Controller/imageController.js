const multer = require('multer');
const fs = require('fs');
const path = require('path');
const port = 3300;

const User = require('../Model/Auth.model')





const data = multer({
    storage: multer.diskStorage({
      destination: async function (req, file, cb) {
        let dir = "./uploadsImages/"+req.users;
        if (!fs.existsSync(dir)){
          await fs.mkdirSync(dir, {recursive: true}, err => {});
        }
        cb(null, dir);
      },
      
      filename: function (req, file, cb) {
        console.log(file);
        let extenstion = file.originalname.split('.')
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
      },
    }),
  });
  
const postimg = (req, res) => {
    res.status(200).json({
      message: "Image is Uploaded",
    });
  };

   const getimages = (req, res) => {
    const folderPath = "uploadsImages/"+req.users;
    let filec = fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error(err);
        return res.status(404).json({
          message:'data not found'
        });
      }
      let urls = files.map((data)=>{
        return `${req.protocol}://${req.hostname}:${port}/${folderPath}/${data}`
      })
      res.status(200).json({
        file:urls,
      });
    });
  };

  const deleteimages =(req, res) => {
    fs.rmdir("uploadsImages/" + req.users, { recursive: true }, (err, data) => {
      if (err) {
        console.log(err)
        return res.status(500).json({
          message: "Error while reading files",
        });
      }
      return res.status(200).json({
        message: "delete successfully!!!!"
      })
    })
  };


//   const removedir=(req,res)=>{
//     let dir="Upload/"+req.username;
//     fs.rmdir(dir,{ recursive: true, force: true },(err)=>{
//       if(err){
//           res.status(401).json({
//               message:"files or image not found"
//           })
//       }else{
//           res.status(200).json({
//               message:"Deleted Successfully"
//           })
//       }
//     })
// }
const registration = (req, res) => {
  // console.log(req.body)
const user =  new User(req.body);

if(user) {
  user.save()

  console.log(user)
  return res.status(202).json({
    message: "created"
  })
}

else{
  return res.status(202).json({
    message: "sorry!!"
})
}
// user.save((err) => {
//   if (err) {
//     res.status(400).send(err);
//   } else {
//     res.send('User created');
//   }
// }); 

}
const showUsers= async (req,res)=>{
const users = await User.find({email:req.body.email});

try {
  res.send(users);
} catch (error) {
  res.status(500).send(error);
}
}
 

// module.exports={login,upload:upload.single('file'),uploads,showimage,removedir,registration,showUsers}

  module.exports ={upload:data.single('data'),postimg,getimages,deleteimages,registration,showUsers}