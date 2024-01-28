import { equal } from "assert";
import { User } from "../payload-types";
import { Access, CollectionConfig } from "payload/types";

const hasAccessToImages =
  (): Access =>
  async ({ req }) => {
    const user = req.user as User | undefined;
    if (!user) return false;
    if (user.role === "admin") return true;
    return {
      user: {
        equals: req.user.id,
      },
    };
  };

export const media: CollectionConfig = {
  slug: "media",
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        return { ...data, user: req.user.id };
      },
    ],
  },
  admin: {
    hidden: ({ user }) => user.role !== "admin",
  },
  access: {
    read: async ({ req }) => {
      const referer = req.headers.referer;
      if (!referer || !referer?.includes("sell")) {
        return true;
      }
      return await hasAccessToImages()({req})
    },
    delete : hasAccessToImages(),
    update : hasAccessToImages(),
  },
  upload: {
    staticURL: "/media",
    staticDir: "media",
    
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
      {
        name: "card",
        width: 786,
        height: 1024,
        position: "centre",
      },
      {
        name: "tablet",
        width: 1024,
        height: undefined,
        position: "centre",
      },
    ],
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      required: true,
      hasMany: false,
      relationTo: "users",
      admin: {
        condition: () => false,
      },
    },
  ],
};
