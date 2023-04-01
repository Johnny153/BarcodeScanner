const router=require('express').Router();
const Product=require('../models/product');
const User=require('../models/user');

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

router.post('/saveProduct/:barCode', async (req, res) => {
    const userId = req.body.userId;
    var user = await User.findOne({_id: userId});
    if(!user) {
        return res.status(404).send('User does not exist!');
    }
    
    // luam produsul cu codul de bare barCode si vedem daca exista
    const product = await Product.findOne({code:req.params.barCode});
    if(!product){
        return res.status(404).send('bar code invalid, does not exist in db!!!');
    }
    // daca exista, trebuie sa modificam user-ul primit cu array ul de product history
    const userProducts = user.productsHistory;
    let productFound = userProducts.includes(product.code);
    // verificam daca deja il are in product history, daca nu, il bagam, daca da, stop.
    if(!productFound) {
        user.productsHistory.push(product.code);
        await user.save();
    }
    return res.status(200).send('Product saved successfully!');
})

router.post('/', async(req, res) => {
    var product= new Product({
            name: req.body.name,
            code: req.body.code,
            quantity: req.body.quantity,
            price: req.body.price,
            category: req.body.category,
            valability: req.body.valability
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