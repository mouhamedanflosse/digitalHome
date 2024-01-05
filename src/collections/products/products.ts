import { PRODUCT_CATEGORIES } from "../../config";
import { CollectionConfig } from "payload/types";
import { Product } from "../../payload-types";
import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { stripe } from "../../lib/strip";


const addUser : BeforeChangeHook<Product>=  async ({req,data}) => {
const user = req.user
return {...data,user : user?.id}
}

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
  },
  access: {},
  hooks : {
    beforeChange : [addUser,   async (args) => {
      if (args.operation === "create") {

        const data = args.data as Product
        const createdProduct = await stripe.products.create({
          name : data.name,
          default_price_data : {
            currency : "USD",
            unit_amount : Math.round(data.price * 100)
          }
        })

        const updated : Product  = {
          ...data,
          priceID : createdProduct.id,
          stripeID : createdProduct.default_price as string
        } 

        return updated

      } else if (args.operation === "update") {
         const data = args.data as Product

        const updateProduct = await stripe.products.update(data.stripeID!,{
          name : data.name,
          default_price : data.priceID!,
        })

        const updated : Product  = {
          ...data,
          stripeID : updateProduct.id,
          priceID : updateProduct.default_price as string
        } 
        return updated
      }
    }]
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "price",
      label: "Price in USD",
      type: "number",
      min: 0,
      max: 1000,

      required: true,
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: PRODUCT_CATEGORIES.map(({ label, value }) => ({ label, value })),
      required: true,
    },
    {
      name: "product_files",
      label: "product file",
      type: "relationship",
      required: true,
      relationTo: "product_files",
      hasMany: false,
    },
    {
      name: "provedforSell",
      label: "product satuts",
      type: "select",
      defaultValue: 'pending',
      access: {
        create: ({ req }) => req.user.role === "admin",
        read: ({ req }) => req.user.role === "admin",
        update: ({ req }) => req.user.role === "admin",
      },
      options: [
        {
          label: "Approved",
          value: "approved",
        },
        {
          label: "Pending for verfiction",
          value: "pending",
        },
        {
          label: "Denied",
          value: "Denied",
        },
      ],
    },
    {
      name: "priceID",
      type: "text",
      access: {
        create: ({ req }) => req.user.role === "admin",
        read: ({ req }) => req.user.role === "admin",
        update: ({ req }) => req.user.role === "admin",
      },
    },
    {
      name: "stripeID",
      type: "text",
      access: {
        create: ({ req }) => req.user.role === "admin",
        read: ({ req }) => req.user.role === "admin",
        update: ({ req }) => req.user.role === "admin",
      },
    },
    {
        name : "images",
        type : "array",
        label : "Product images",
        minRows : 1,
        maxRows : 4,
        required : true,
        labels : {
            singular : "Image",
            plural : "Images",
        },
        fields : [
            {
                name : "image",
                type : "upload",
                relationTo : "media",
                required : true,
            }
        ]
    }
  ],
};
