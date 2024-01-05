import { buildConfig } from "payload/config";
import {slateEditor} from "@payloadcms/richtext-slate"
import { mongooseAdapter } from "@payloadcms/db-mongodb"
import { webpackBundler } from "@payloadcms/bundler-webpack";
import path from "path";
import { Users } from "./collections/Users";
import dotenv from "dotenv"
import { Products } from "./collections/products/products";
import { media } from "./collections/Media";
import { product_files } from "./collections/ProductFile";
import { Order } from "./collections/Order";

dotenv.config({
   path : path.resolve(__dirname,"../.env")
})

export default buildConfig({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '', 
    collections: [Users,Products,media,product_files,Order],
    routes : { 
        admin : "/sell",
    },
     admin : {
      user : "users",
        bundler : webpackBundler(),
        meta : {
            titleSuffix : "- digitalHome",
            favicon : '/favicon.ico',
            ogImage : '/thumbnail.jpg'
        }
     },
     rateLimit : {
        max : 2000,
     },
     editor : slateEditor({}),
     db : mongooseAdapter({
        url : process.env.MONGODB_CONNECTION!
     }),
     typescript : {
        outputFile : path.resolve(__dirname, 'payload-types.ts')
     }
})