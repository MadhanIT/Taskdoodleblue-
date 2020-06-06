const express = require('express');
const router = express.Router();
const Accounts = require("../../models/Accounts");

//User Create
router.post('/UserCreate',async (req, res) => {
    
    
    if(req.body.UserId){
        const UserData = {
            UserName : req.body.UserName,
            Email : req.body.Email,
            MobileNumber : req.body.MobileNumber,
            CompanyName : req.body.CompanyName,
            UpdatedAt : new Date()
        }
        await Accounts.findOneAndUpdate({_id: req.body.UserId}, UserData, {new: true}).then(UserInfo => {
            res.status(200).json({
                result: UserInfo,
                message: 'User Updated Successfully'
            })
        }).catch(err=>{
            res.status(404).json({error:"User Not Found"})
        });
    }else {
        const UserData = new Accounts({
            UserName : req.body.UserName,
            Email : req.body.Email,
            MobileNumber : req.body.MobileNumber,
            CompanyName : req.body.CompanyName,
            active : true
        });
        await UserData.save().then(result => {
            res.status(200).json({
                Result: 1,
                Message: result
            })
        });
    }
});

router.post('/UserDelete',async (req, res) => {
  
    const PasswordData = {
        active : false
    };
    Accounts.findOneAndUpdate({_id: req.body.UserId}, PasswordData, {new: true}).then(UserInfo => {
        res.json({
            "result": UserInfo,
            message: 'User Deleted Successfully'
        })
    }).catch(err=>{
        res.status(404).json({error:"User Not Found"})
    });

});
router.get('/getUsers',async (req, res) => {
  
    Accounts.find({active: true}).then(UserInfo => {
        res.json({
            result: 1,
            Data: UserInfo
        })
    }).catch(err=>{
        res.status(404).json({error:"User Not Found"})
    });

});
module.exports = router;