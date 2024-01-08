import { PRODUCT_CATEGORIES } from "../../config";
import { Access, CollectionConfig } from "payload/types";
import { Product, User } from "../../payload-types";
import {
  BeforeChangeHook,
  AfterChangeHook,
} from "payload/dist/collections/config/types";
import { stripe } from "../../lib/strip";

const addUser: BeforeChangeHook<Product> = async ({ req, data }) => {
  const user = req.user;
  return { ...data, user: user?.id };
};

const syncUser: AfterChangeHook<Product> = async ({ req, doc }) => {
  const user = await req.payload.findByID({
    collection: "users",
    id: req.user.id,
  });
  
  if (user && typeof user === "object") {
    const { products } = user;

    const prdIDs = [
      ...(products?.map((prd) => {
        return typeof prd === "object" ? prd.id : prd;
      }) || []),
    ];

    const createdprdIDs = prdIDs.filter(
      (id, index) => prdIDs.indexOf(id) === index
    );
    const allprds = [...createdprdIDs, doc.id];

    await req.payload.update({
      collection: "users",
      id: user.id,
      data: {
        products: allprds,
      },
    });
  }
};

const hasAccess: Access = async ({ req }) => {
  const user = req.user as User | undefined;
  if (!user) return false
  if (user?.role === "admin") return true;
  const prdIds = (user.products || []).reduce<string[]>((acc,prd) => {
    if (!prd) return acc
    else if (typeof prd === "string") {
      acc.push(prd)
    } else {
      acc.push(prd.id)
    }
    return acc
  } , [])
  return {
    id: {
      in: prdIds,
    },
  };
};

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read : hasAccess,
    update : hasAccess,
    delete : hasAccess,
  },
  hooks: {
    afterChange: [syncUser],
    beforeChange: [
      addUser,
      async (args) => {
        if (args.operation === "create") {
          const data = args.data as Product;
          const createdProduct = await stripe.products.create({
            name: data.name,
            default_price_data: {
              currency: "USD",
              unit_amount: Math.round(data.price * 100),
            },
          });

          const updated: Product = {
            ...data,
            priceID: createdProduct.id,
            stripeID: createdProduct.default_price as string,
          };

          return updated;
        } else if (args.operation === "update") {
          const data = args.data as Product;

          const updateProduct = await stripe.products.update(data.stripeID!, {
            name: data.name,
            default_price: data.priceID!,
          });

          const updated: Product = {
            ...data,
            stripeID: updateProduct.id,
            priceID: updateProduct.default_price as string,
          };
          return updated;
        }
      },
    ],
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
      defaultValue: "pending",
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
      name: "images",
      type: "array",
      label: "Product images",
      minRows: 1,
      maxRows: 4,
      required: true,
      labels: {
        singular: "Image",
        plural: "Images",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
};
