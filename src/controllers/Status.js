const { where, DATE } = require('sequelize');
const sequelize = require('../model/index')
const initModel = require('../model/init-models')
const model = initModel(sequelize)
const _ = require("lodash")

const { successCode, errorCode, failCode } = require('../ulti/response');
const { includes } = require('lodash');


const StatusPost = async (req, res) => {
    try{
        const {content, type_id, user_id} = req.body;
        var d = new Date()
        let object = {
            content,
            type_id,
            update_time: d.toISOString(),
            user_id
        }
        const data = await model.status.create(object);
        successCode(res, data,"Đăng bài thành công!")
    }
    catch(err)
    {
            failCode(res,'',"Lỗi")
    }
}

const StatusDelete = async (req, res) => {
    const { id } = req.body;
    let checkStt = await model.status.findByPk(id);

    if (checkStt) {
        let data = await model.status.destroy({
            where: {
                status_id: id
            }
        })
        successCode(res,data,"Xóa thành công")
    }
    else {
        errorCode(res, "Không tìm thấy bài cần xóa!!!")
    }
}

const StatusUpdate = async (req, res) => {
    const {id} = req.body;
    const {type_id, content} = req.body
    let object = {
        type_id,
        content,
        update_time: Date.now()
    }

    let checkStt = await model.status.findByPk(id);
    
    if(checkStt) {
        let data = await model.status.update(object, {
            where: {
                Status_id: id
            }
        })

        let dataNew = await model.status.findByPk(id)
        successCode(res,dataNew,"Cập nhật status thành công!!!")
    }
    else {
        errorCode(res,"Không tìm thấy status!!!")
    }
}

const StatusShow = async(req, res) => {
    let data = await model.status.findAll({include: ['type','user']});
    successCode(res,_.orderBy(data,['update_time'],['desc']))
}

const StatusShowId = async(req,res) => {
    const { id } = req.params;
    let data = await model.status.findAll({
        include: ["user"],
        where: {
            user_id: id
        }
    });
    successCode(res,data)
}
module.exports = {
    StatusPost,
    StatusDelete,
    StatusUpdate,
    StatusShow,
    StatusShowId
}