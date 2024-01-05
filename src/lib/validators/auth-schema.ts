import {z} from  "zod"

// for sign up
export const authValidtion = z.object({
    email : z.string().email({message : "invalid email"}),
    password : z.string().min(8, {message : "password must be at least 8 characters long."}),
    confirm : z.string()
}).refine((data) => data.password === data.confirm, {
    path: ['confirm'],
    message: 'Passwords does not match'
  })

export type TauthValidtion = z.infer<typeof authValidtion>



// for sign in 
export const authValidtion2 = z.object({
    email : z.string().email({message : "invalid email"}),
    password : z.string().min(8, {message : "password must be at least 8 characters long."}),
})

export type TauthValidtion2 = z.infer<typeof authValidtion2>

