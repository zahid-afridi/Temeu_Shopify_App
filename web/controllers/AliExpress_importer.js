import axios from "axios";
import ProductModel from "../models/Products.js";

export const Importer_Product = async (req, res) => {
  try {
    console.log('API call initiated');

    const { url, Shop_id } = req.query;
    console.log('URL:', url);
    console.log('Shop_id:', Shop_id);

    // Check if the URL and Shop_id are provided
    if (!url || !Shop_id) {
      return res.status(400).send('Missing required parameters: url and Shop_id');
    }

    // Regular expression to extract item_id from the URL (e.g., /item/1005006869617514)
    const regex = /\/item\/(\d+)/;
    const match = url.match(regex);

    if (match && match[1]) {
      const item_id = match[1];
      console.log('Item ID:', item_id);

      // Make a request to the AliExpress DataHub API
      const response = await axios.get(`https://aliexpress-datahub.p.rapidapi.com/item_detail?itemId=${item_id}`, {
        headers: {
          'x-rapidapi-key': '9067343c3bmshe3cede364672671p133b24jsn54417485dcc7',
          'x-rapidapi-host': 'aliexpress-datahub.p.rapidapi.com',
        },
      });

      const data = response.data.result;

      // Check if data and item exist before accessing the properties
      if (data && data.item) {
        const item = data.item;
        // console.log('Product data:', item);

        const filteredImages = item.images
    .filter(image => image.startsWith("//")) // Ensures it starts with "//"
    .map(image => `https:${image}`);   
    const textDescription = item?.description.html.replace(/<[^>]*>/g, "").trim();
        // Insert product into the database
        await ProductModel.create({
          title: item.title || 'No title available',  // Added fallback value
          description: textDescription ||  'no description',
          price: item.sku?.def?.price || 'N/A',  // Added fallback for price
          image_url: filteredImages || [],
          shop_id: Shop_id,
          itme_Id: item.itemId,
          product_url:item.itemUrl || 'No URL available',  // Added fallback for product URL
          mainImage: item.images[0] || 'No image available',  // Added fallback for main image
        });

        // Return the product data as a response
        return res.status(200).json({
          success: true,
          message: 'Product fetched successfully',
          item,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: 'Product data not found',
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: 'Product not found or invalid URL',
      });
    }
  } catch (error) {
    console.log('Import error:', error);

    // Handle errors
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
