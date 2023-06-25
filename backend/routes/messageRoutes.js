const { sendMessage, allMessage } = require('../controllers/messageController')
const {protect}=require('../middlewares/authmiddleware')

const express=require('express')
const router=express.Router()

router.route('/').post(protect,sendMessage)
router.route('/:chatId').get(protect,allMessage)



module.exports=router
