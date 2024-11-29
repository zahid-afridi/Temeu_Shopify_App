import BillingModel from "../models/Billing.js"
import shopify from "../shopify.js"


export const GetStorePyment=async(req,res)=>{
    try {
        const {  StoreId} = req.query
        const StorePayment= await BillingModel.findOne({store_id:StoreId})
        if (!StorePayment) {
            return res.status(404).json({success:false,message:"Not data Found"})
        }
        return res.status(200).json({success:true,StorePayment})

    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"Internal Server Error"})
        
    }
}

export const UserPay=async(req,res)=>{
    try {  
        
       
       
        const {name,price,retrun_url,aliexProductnumber,csvProductNumber,store_id}=req.body
        
        const appliction_charge = await new shopify.api.rest.ApplicationCharge({
            session: res.locals.shopify.session,
        })
        // const appliction_charge = await new shopify.api.rest.RecurringApplicationCharge({
        //     session: res.locals.shopify.session,
        // })
      
        appliction_charge.name =name,
        appliction_charge.price= price,
        appliction_charge.return_url =retrun_url
        appliction_charge.test =true;
       
        await appliction_charge.save({
            update:true
        })
        await BillingModel.findOneAndUpdate(
            { store_id: store_id },
            {
                $set: {
                    upcomingProductNumber: aliexProductnumber,
                    upcomingcsvProductNumber: csvProductNumber,
                    billingId: appliction_charge.id,
                    
                }
            },
            { new: true, upsert: true }
        );
      
       console.log('AplicationCharge',appliction_charge)
       
     
        res.status(200).json(appliction_charge)
    } catch (error) {
        res.status(500).json({message:'intnernal server errror'})
        console.log('getPyament error',error)
        
    }
}

// export const GetPyament=async(req,res)=>{
//     try {
//         const {ChargeId}=req.query;
//         console.log('ChageId ',ChargeId)
       

   
//         const appliction_charge = await shopify.api.rest.ApplicationCharge.find({
//             session: res.locals.shopify.session,
//             id:ChargeId
//         })
//         const FindStoreBilling=await BillingModel.findOne({billingId:ChargeId})
//         console.log('FindStoreBilling',FindStoreBilling)
//         if (!FindStoreBilling) {
//             return res.status(404).json({success:false, message:"No Billing Found"})
//         }
//          await BillingModel.findOneAndUpdate(
//             {billingId:ChargeId},
//             {$inc:{aliexProductNumber:FindStoreBilling.upcomingProductNumber}},
//             {$inc:{csvProductNumber:FindStoreBilling.upcomingcsvProductNumber}},
//             {new:true}
//         )
       
      
//         res.status(200).json(appliction_charge)
//     } catch (error) {
//         res.status(500).json({message:'intnernal server errror'})
//         console.log(error)
//     }
// }

export const GetPyament = async (req, res) => {
    try {
      const { ChargeId } = req.query;
      if (!ChargeId) {
        return res.status(400).json({ success: false, message: "ChargeId is required" });
      }
  
      console.log("ChargeId:", ChargeId);
  
      // Fetch the ApplicationCharge from Shopify
      const applicationCharge = await shopify.api.rest.ApplicationCharge.find({
        session: res.locals.shopify.session,
        id: ChargeId,
      });
  
      if (!applicationCharge) {
        return res.status(404).json({ success: false, message: "Application Charge not found" });
      }
  
      console.log("Application Charge:", applicationCharge);
  
      // Find the existing billing record
      const FindStoreBilling = await BillingModel.findOne({ billingId: ChargeId });
      if (!FindStoreBilling) {
        return res.status(404).json({ success: false, message: "No Billing Found" });
      }
  
      console.log("FindStoreBilling:", FindStoreBilling);
  
      // Update the billing record
      const updatedBilling = await BillingModel.findOneAndUpdate(
        { billingId: ChargeId },
        {
          $inc: {
            aliexProductNumber: FindStoreBilling.upcomingProductNumber,
            csvProductNumber: FindStoreBilling.upcomingcsvProductNumber,
          },
          $set: {
            upcomingProductNumber: 0,
            upcomingcsvProductNumber: 0,
          },
        },
        { new: true } // Return the updated document
      );
  
      console.log("Updated Billing:", updatedBilling);
  
      // Respond with the application charge and updated billing info
      res.status(200).json({
        success: true,
        applicationCharge,
        updatedBilling,
      });
    } catch (error) {
      console.error("Internal Server Error:", error);
      res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
  };
  