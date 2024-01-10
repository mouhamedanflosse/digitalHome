import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { User } from "../payload-types";
import { Access, CollectionConfig } from "payload/types";

const addUser: BeforeChangeHook = ({ req, data }) => {
  const user = req.user as User | null;
  return { ...data, user: user?.id };
};

const ownedOrdpurchasedProduct: Access = async ({ req }) => {
  const user = req.user as User | null;
  if (!user) return false;
  if (user.role === "admin") return true;

  const { docs: products } = await req.payload.find({
    collection: "products",
    where: {
      user: {
        equals: user,
      },
    },
  });
  const ownedProduct = products.map((prd) => prd.product_files).flat();

  const { docs: orders } = await req.payload.find({
    collection: "order",
    where: {
      user: {
        equals: user,
      },
    },
  });

  const purchasedProductFIles = orders
    .map((order) => {
      return order.products.map((prd) => {
        if (typeof prd === "string")
          return req.payload.logger.error(
            "search depth not suffcient to find pruchsed file IDs"
          );
        return typeof prd.product_files === "string"
          ? prd.product_files
          : prd.product_files.id;
      });
    })
    .filter(Boolean)
    .flat();

  return {
    id: {
      in: [...purchasedProductFIles, ...ownedProduct],
    },
  };
};

export const product_files: CollectionConfig = {
  slug: "product_files",
  admin: {
    hidden: ({ user }) => user.role !== "admin",
  },
  hooks: {
    beforeChange: [addUser],
  },
  upload: {
    staticURL: "/product_files",
    staticDir: "Product_files",
    mimeTypes: [
      "image/*",
      "font/*",
      "application/*",
      "application/vnd.rar",
      "application/zip",
    ],
  },
  access: {
    read: ownedOrdpurchasedProduct,
    update: ({ req }) => req.user.role === "admin",
    delete: ({ req }) => req.user.role === "admin",
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      admin: {
        condition: () => false,
      },
      relationTo: "users",
      hasMany: false,
      required: true,
    },
  ],
};
