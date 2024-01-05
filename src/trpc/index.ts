import { QueryValidator } from "../lib/validators/query-validator";
import { authRouter } from "./auth-router";
import { PublicProcedure, router } from "./trpc";
import {z} from "zod"
import { getPayloadClient } from "../get-payload";
import { paymentRouter } from "./payment-router";

export const appRouter = router({
   auth : authRouter,
   payment : paymentRouter,
   getProducts : PublicProcedure.input(z.object({ 
      limit : z.number().min(1).max(100),
      cursor : z.number().nullish(),
      query : QueryValidator
   })).query(async ({input}) => {
      const {query,cursor} = input
      const {sort,limit, ...queryOptions} = query

      const payload = await getPayloadClient()

      const parsedqueryOptions : Record<string, {equals : string}> = {}

      Object.entries(queryOptions).forEach(([key,value]) => {
         parsedqueryOptions[key] = {
            equals : value
         }
      })

      const page = cursor || 1

      const {docs: item, nextPage , hasNextPage} = await payload.find({
         collection : "products",
         where : {
            provedforSell : {
               equals : "approved"
            },
            ...parsedqueryOptions
         },
         sort,
         limit,
         depth : 1,
         page
      })
       return {
         item,
         nextPage : hasNextPage ? nextPage : null
       }
   })
   
})
export type appRouter = typeof appRouter