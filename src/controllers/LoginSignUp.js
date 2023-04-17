const sequelize = require('../model/index')
const initModel = require('../model/init-models')
const model = initModel(sequelize)
const bcrypt = require('bcrypt')

const { successCode, errorCode, failCode } = require('../ulti/response');

const signUp = async(req, res) => {
    try {
        let { account, password, first_name, last_name, dob, email } = req.body

        let data = {
            account,
            password : bcrypt.hashSync(password, 10),
            first_name,
            last_name,
            dob,
            email,
            avatar: '/public/image/avatar-mac-dinh-1.png',
            bpoint: 0
        }
        let checkAccount = await model.user.findOne({
            where: {
                account
            }
        })
        let checkEmail = await model.user.findOne({
            where: {
                email
            }
        })
        if (checkAccount) {
            failCode(res,'data','Tài khoản đã tồn tại!!!')
        }
        else if (checkEmail) {
            failCode(res,'data','Email đã được sử dụng!!!')
        }
        else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email))) {
        failCode(res,data,'Sai cú pháp Email');
        }
        else {
            await model.user.create(data)
            successCode(res,data,'Đăng ký tài khoản thành công')
        }
    }
    catch (err) {
        failCode(res,'','Lỗi!!!')
    }
}



const Login = async(req, res) =>{
    try{    
        let {account,password} =req.body;
        let object ={
            account,password   
        }


        let checkAccount =await model.user.findOne({
            where:{
                account,       
            },  
          
        })
        if(checkAccount){
            let checkPass =bcrypt.compareSync(password,checkAccount.password)
           
            if(checkPass){  
                
                successCode(res,checkAccount)
                
            }else{
                failCode(res,object,"Sai mật khẩu!!!")
            }
        }
        else {
            failCode(res, object, "Tài khoản không tồn tại!!!")
        }
    }catch(err){
        failCode(res,object,"Lỗi!!!")
    }
}

const Logout = async(req, res) => {
    const {email} = req.body;
    let checkEmail = await model.user.findOne({
        where: {
            email: email
        }
    })
    if (checkEmail) {
        successCode(res,'','Đăng xuất thành công!!!')
    }
    else {
        failCode(res,'','???')
    }
}


module.exports = {
    signUp,
    Login,
    Logout
}