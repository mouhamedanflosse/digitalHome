import {createTRPCReact} from "@trpc/react-query" 
import type { appRouter } from "./index"
export const trpc = createTRPCReact<appRouter>({})