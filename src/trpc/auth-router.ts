import { PublicProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { authValidtion, authValidtion2 } from "../lib/validators/auth-schema";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const authRouter = router({
  createUser: PublicProcedure.input(authValidtion).mutation(
    async ({ input }) => {
      const { email, password } = input;
      const payload = await getPayloadClient();

      // check if user already exists
      const { docs: users } = await payload.find({
        collection: "users",
        where: {
          email: {
            equals: email,
          },
        },
      });

      if (users.length !== 0) throw new TRPCError({ code: "CONFLICT" });

      await payload.create({
        collection: "users",
        data: {
          email: email,
          password: password,
          role: "user",
        },
      });
      return { success: true, sentToEmail: email };
    }
  ),
  verifyEmail: PublicProcedure.input(z.object({ token: z.string() })).query(
    async ({ input }) => {
      const { token } =  input;
      const payload = await getPayloadClient();

      const isVerified = await payload.verifyEmail({
        collection: "users",
        token,
      });

      if (!isVerified) throw new TRPCError({ code: "UNAUTHORIZED" });

      return { success: true };
    }
  ),
  signIn : PublicProcedure.input(authValidtion2).mutation(
    async ({ input,ctx }) => {
      const {res} = ctx
      const { email, password } = input;
      const payload = await getPayloadClient();

      try {
        await payload.login({
          collection : "users",
          data : {
            email,
            password
          },
          res
        })
        return {success : true}
      } catch(err) {
        return new TRPCError({code : "UNAUTHORIZED"})
      }
    })
});
