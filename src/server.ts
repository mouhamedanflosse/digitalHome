import express from "express"
import { getPayloadClient } from "./get-payload"
import { nextApp, nextHundler } from "./next-utils"
import * as trpcExpress from "@trpc/server/adapters/express"
import { appRouter } from "./trpc"
import { inferAsyncReturnType } from "@trpc/server"
import bodyParser from "body-parser"
import { IncomingMessage } from "http"
import { stripeWebHookHandlar } from "./webhook"
import nextBuild from "next/dist/build"
import path from "path"
import { PayloadRequest } from "payload/types"
import { parse } from "url"

const app = express()
const PORT = Number(process.env.PORT) || 3000

const createContext = ({req,res} : trpcExpress.CreateExpressContextOptions) => ({
    req,res
})
 export type webHookRequest = IncomingMessage & {rawBody : Buffer}

export type Expresscontent = inferAsyncReturnType<typeof createContext>

const start = async () => {
    const payload = await getPayloadClient({
        initOptions : {
            express : app,
            onInit : async (CMS) => {
                CMS.logger.info(`the admin URL ${CMS.getAdminURL}`)
            }
        }
    })

    const webHookMiddlleware = bodyParser.json({
        verify(req : webHookRequest,_,buffer) {
            req.rawBody = buffer;
        },
    })
    

    app.post("/api/webhook/strip",webHookMiddlleware,stripeWebHookHandlar)

    app.use('/api/trpc', trpcExpress.createExpressMiddleware({
        router : appRouter,
        createContext,
    }))
    
    app.use((req,res) => nextHundler(req,res))


    if (process.env.NEXT_BUILD) {
        app.listen(PORT, async () => {
          payload.logger.info(
            'Next.js is building for production'
          )
          // @ts-expect-error
          await nextBuild(path.join(__dirname, '../'))
          process.exit()
        })
        return
      }

      const cartRouter = express.Router()
      cartRouter.use(payload.authenticate)

      cartRouter.get("/", (req,res) => {
        if (!(req as PayloadRequest).user) return res.redirect("/sign-in?origin=cart")
        const parsedUrl = parse(req.url,true)

        return nextApp.render(req,res,"/cart",parsedUrl.query)
      })

      app.use("/cart",cartRouter)

    nextApp.prepare().then(() => {
        payload.logger.info("Next js started")
        app.listen(PORT, async () => {
            payload.logger.info(`Next js app URL : ${process.env.NEXT_PUBILC_SERVER_URL}` )
        })
    })

}

start()