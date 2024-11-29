import axios from "axios";
import ProductModel from "../models/Products.js";

const CsvProductimport = async (req, res) => {
  const { asin } = req.body;
  const { Shop_id } = req.query;
  
  try {
    console.log('asin', asin);
    console.log('sho', Shop_id);
    console.log('csvFile api call');

    if (!asin) {
      return res.status(400).json({ success: false, message: "ASIN is required" });
    }

    // Fetch the product data from the API
    const response = await axios.get(`https://aliexpress-datahub.p.rapidapi.com/item_detail?itemId=${asin}`, {
      headers: {
        'x-rapidapi-key': '9067343c3bmshe3cede364672671p133b24jsn54417485dcc7',
        'x-rapidapi-host': 'aliexpress-datahub.p.rapidapi.com',
      },
    });

    const data = response.data.result;
    
    if (data && data.item) {
      const item = data.item;
      const filteredImages = item.images
        .filter(image => image.startsWith("//"))
        .map(image => `https:${image}`);
      const textDescription = item?.description.html.replace(/<[^>]*>/g, "").trim();

      const newProduct = new ProductModel({
        title: item.title || 'No title available',
        description: textDescription || 'No description',
        price: item.sku?.def?.price || 'N/A',
        image_url: filteredImages || [],
        shop_id: Shop_id,
        item_Id: item.itemId,
        product_url: item.itemUrl || 'No URL available',
        mainImage: item.images[0] || 'No image available',
      });

      await ProductModel.create(newProduct);
      return res.status(200).json({ success: true, message: `Product with ID ${asin} fetched and saved successfully` });
    } else {
      return res.status(404).json({
        success: false,
        message: `No product found for ID: ${asin}`,
      });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default CsvProductimport;
