const jwt = require('jsonwebtoken');
const JWT_SECRET = 'IAMINEVITABLE'
const express = require('express');
//this Fn will fetch the user details and afet res and req next fn will be executed where this Fn is called 
const fetchuser =(req, res, next)=>{
// Get the user details from JWT token and add  id in the request object
const token = req.header('auth-token');
if(!token){
    res.status(401).send({error: "Please authenticate using a valid token"})
}
try {
    const data = jwt.verify(token , JWT_SECRET);
    req.user = data.user;
    next();
} catch (error) {
    res.status(401).send({error : "Please authenticate using a valid token"})
}
    
}
module.exports= fetchuser;