const router=require('express').Router();
const Product=require('../models/product');

router.get('/',async (req, res) => {
    try{
        const product = await Product.find();
        res.json(product);
    } catch(error){
        res.json([message, error]);
    }
})

router.get('/:barCode',async (req, res) => {
    try{
        const product = await Product.findOne(
            {code:req.params.barCode});
        res.json(product);
    } catch(error){
        res.json([message, error]);
    }
});

router.post('/', async(req, res) => {
    var product= new Product({
            name: req.body.name,
            code: req.body.code,
            quantity: req.body.quantity,
            price: req.body.price,
            category: req.body.category,
            description: req.body.description
        });
    try{
        const savedProduct=await product.save();
        res.send({product: savedProduct._id});
    }
    catch(error){
        res.status(400).send(error);
    }
})

router.put('/:barCode', async(req, res) => {
    try {
        const patched= await Product.findOneAndUpdate(
            {code:req.params.barCode},
            {$set:req.body},
            {new:true});
        res.json(patched);
    }
    catch (error) {
        res.status(400).send(error);
    }
})

router.delete('/:barCode', async(req,res) => {
    try {
        const deletedProduct=await Product.findOneAndUpdate(
            {code:req.params.barCode});
            res.json(deletedProduct);
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports=router;