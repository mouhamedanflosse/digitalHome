import { User } from "payload/dist/auth";
import { Access, CollectionConfig } from "payload/types";

const yourOrder : Access = ({req}) => {
    const user = req.user as User | null
    if (user?.role === "admin") return true

    return {
        user : {
            equals : user?.id
        }
    }
}

export const Order: CollectionConfig = {
  slug: "order",
  admin: {
    useAsTitle: "your orders",
    description: "a summary for all your orders on digitalHome",
  },
  access: {
    read : yourOrder,
    create: ({ req }) => req.user.id === "admin",
    update: ({ req }) => req.user.id === "admin",
    delete: ({ req }) => req.user.id === "admin",
  },
  fields: [
    {
      name: "_isPaid",
      required: true,
      type: "checkbox",
      access: {
        read: ({ req }) => req.user.role === "admin",
        update: () => false,
        create: () => false,
      },
      admin: {
        hidden: true,
      },
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: "products",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
      required: true,
    },
  ],
};
