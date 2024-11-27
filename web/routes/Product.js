
import express from 'express'
import { GetProducts } from '../controllers/Products.js'


const ProductRoutes=express.Router()

ProductRoutes.get('/getProduct',GetProducts)


export default ProductRoutes