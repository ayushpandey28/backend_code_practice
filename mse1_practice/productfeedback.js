const express = require("express");
const app = express();
app.use(express.json());

const products = [
    {
        id: 1,
        name: "Laptop",
        ratingCount: 0,
        ratingTotal: 0,
        averageRating: 0
    },
    {
        id: 2,
        name: "Mobile Phone",
        ratingCount: 0,
        ratingTotal: 0,
        averageRating: 0
    }
];
// 1
app.get("/api/products",(req,res)=>{
    res.status(200).json({
        message:"Products retrieved successfully",
        products:products
    });
});

//2 
app.post("/api/rate",(req,res)=>{
    const {productId,rating}=req.body;
    if(productId===undefined || rating===undefined
        
    ){
        return res.status(400).json({
            message:"productId and rating are required",
        });
    }
    const product=products.find(p=>p.id===Number(productId));
    if(!product){
        return res.status(404).json({
            message:"Product not found"
        });
    }
    const numericRating=Number(rating);
    if(isNan(numericRating) || numericRating<1 || numericRating>5){
        return res.status(400).json({
            message:"Rating must be between 1 and 5"
        });
    }
product.ratingCount++;
product.averageRating;
});

app.get("/api/ratings",(req,res)=>{
    const ratings=products.map(product=>({
        name:product.name,
        noOfratings:product.noOfratings,
        averageRating:product.averageRating
    }));
    res.status(200).json({
        message:"Product ratings retrieved successfully",
        ratings:ratings
    })
})