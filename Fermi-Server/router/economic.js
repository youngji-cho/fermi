const express =require('express');
const app =express();

const router= express.Router();
router.post('/',(req,res)=>{
  res.send('I Love Lisa');
});

module.exports = {
  router:router
}
