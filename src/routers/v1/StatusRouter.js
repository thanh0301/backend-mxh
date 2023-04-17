const express = require('express');
const {StatusPost, StatusDelete,StatusUpdate,StatusShow,StatusShowId} = require('../../controllers/Status')
const StatusRouter =express.Router();

StatusRouter.post("/statuspost", StatusPost)
StatusRouter.delete("/statusdelete", StatusDelete)
StatusRouter.get("/statusupdate/:id",StatusUpdate)
StatusRouter.get("/statusshow",StatusShow)
StatusRouter.get("/statusshowid/:id",StatusShowId)


module.exports = StatusRouter;