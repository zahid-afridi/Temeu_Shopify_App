import express from "express";
import { Importer_Product } from "../controllers/AliExpress_importer.js";


const Aliexpress_importer_Routes=express.Router()

Aliexpress_importer_Routes.get('/importProduct',Importer_Product)

export default Aliexpress_importer_Routes