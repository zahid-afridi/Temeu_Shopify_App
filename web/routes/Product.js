
import express from 'express'
import { DelteProducts, GetProducts, UploadeProduct } from '../controllers/Products.js'


const ProductRoutes=express.Router()

ProductRoutes.get('/getProduct',GetProducts)
ProductRoutes.post('/upload',UploadeProduct)
ProductRoutes.delete('/delete',DelteProducts)
// ProductRoutes.put('/update_url',UpdateUrl)


export default ProductRoutes