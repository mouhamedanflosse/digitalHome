import { z } from "zod";
import {  privateProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { getPayloadClient } from "../get-payload";
import { stripe } from "../lib/strip";
import type Stripe from "stripe";

export const paymentRouter = router({
  createSession:  privateProcedure
    .input(z.object({ productIDs: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;
      const { productIDs } = input;

      if (productIDs.length <= 0) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      const payload = await getPayloadClient();

      const { docs: products } = await payload.find({
        collection: "products",
        where: {
          id: {
            in: productIDs,
          },
        },
      });

      const filteredProduct = products.filter((pr) => Boolean(pr.stripeID));

      const order = await payload.create({
        collection: "order",
        data: {
          _isPaid: false,
          products: filteredProduct.map((item) => item.id),
          user: user.id,
        },
      });

      const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

      line_items.push({
        price: "price_1OTS8ZGjvs2pAq0dAuF6jrc3",
        quantity: 1,
        adjustable_quantity: {
          enabled: false,
        },
      });

      filteredProduct.forEach((prd) => {
        line_items.push({
          price: prd.stripeID!,
          quantity: 1,
        });
      });

      try {
        const stripeSession = await stripe.checkout.sessions.create({
          success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderID=${order.id}`,
          cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
          payment_method_types: ["card", "paypal"],
          mode: "payment",
          metadata: {
            userId: user.id,
            orderId: order.id,
          },
          line_items,
        });
         return { url: stripeSession.url }
      } catch (err) {
        return { url: null }
      }
    }),
    getOrderStatus : privateProcedure.input(z.object({orderID : z.string()})).query(async ({input}) => {
      const {orderID} = input
      const payload = await getPayloadClient()
      const {docs : orders} = await payload.find({
        collection : "order",
        where : {
          id : {
            equals :  orderID
          }
        }
      })

      
      if (!orders.length) throw new TRPCError({code : "NOT_FOUND"})
      
      const [order] = orders

     return {isPaid : order._isPaid}
    })
});
