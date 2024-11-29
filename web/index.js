// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";

import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import PrivacyWebhookHandlers from "./privacy.js";
import StoreModel from "./models/Store.js";
import DbCon from "./db/db.js";
import Aliexpress_importer_Routes from "./routes/AliExpress_importer.js";
import ProductRoutes from "./routes/Product.js";
import BillingModel from "./models/Billing.js";
import Csvroutes from "./routes/CsvUpload.js";
import BillingRoute from "./routes/Billing.js";

const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();
// database connecrion 
DbCon()
// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: PrivacyWebhookHandlers })
);

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());

app.use('/api',Aliexpress_importer_Routes)
app.use('/api/products',ProductRoutes)
app.use('/api/upload',Csvroutes)
app.use('/api/billing',BillingRoute)


// shopify store api
app.get('/api/store/info', async (req, res) => {
  try {
    const Store = await shopify.api.rest.Shop.all({
      session: res.locals.shopify.session,
    });
    // console.log("Storename",Store.data[0].domain)
      // console.log('Store Information',Store)
    if (Store && Store.data && Store.data.length > 0) {
      const storeName = Store.data[0].name;
      const domain = Store.data[0].domain;
      const country=Store.data[0].country;
      const Store_Id=Store.data[0].id
     

      // Check if storeName exists in the database
      let existingStore = await StoreModel.findOne({ storeName });

      if (!existingStore) {
        // If it doesn't exist, save it
        const newStore = new StoreModel({ storeName,domain,country,Store_Id });
        await newStore.save();
       await BillingModel.create({
          store_id:Store_Id,
          ebayProductNumber:10,
          csvProductNumber:10
        })
      existingStore = newStore;
      }

      // Send response with existingStore only
      res.status(200).json(existingStore); // Send existingStore directly in the response
    } else {
      res.status(404).json({ message: 'Store not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server Error" });
  }
});

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(
      readFileSync(join(STATIC_PATH, "index.html"))
        .toString()
        .replace("%VITE_SHOPIFY_API_KEY%", process.env.SHOPIFY_API_KEY || "")
    );
});

app.listen(PORT);
