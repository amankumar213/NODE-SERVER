const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());

(async function connectDB() {
    try {
        const connetion = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected`);
    }
catch(error) {
        console.log(error);
    }
})()

const productSchema = mongoose.Schema({
    title: String,
    price: Number,
    category: String,
});

const Product = mongoose.model('Product', productSchema);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

//Create

app.post('/product', async (req, res) => {
    try{
        await Product.create(req.body);
        res.send('Product added successfully');
    }
    catch(error){
        console.log(error);
    }   
});

//Read

app.get('/product', async (req, res) => {
    try{
        const products = await Product.find();
        res.send(products);
    }
    catch(error){
        console.log(error);
    }   
});

//Update

app.put('/product/:id', async (req, res) => {
    try {
        await Product.findByIdAndUpdate({_id:req.params.id}, req.body);
        res.send('Product updated successfully');
    } catch (error) {
        console.log(error);   
    }
});

//Delete

app.delete('/product/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete({_id:req.params.id});
        res.send('Product deleted successfully');
    } catch (error) {
        console.log(error);
        
    }

});

app.listen(5000, () => {
    console.log('Server is running on port 5000');

});

// these two commands for connect the database


