import z from "zod";


export const signupInput=z.object({
    username:z.string().email(),
    name:z.string().optional(),
    password:z.string().min(6)
})

export type SignupInput=z.infer<typeof signupInput>

export const signinInput=z.object({
    username:z.string().email(),
    password:z.string().min(6)
})

export type SigninInput=z.infer<typeof signinInput>

export const blogCreateInput=z.object({
    title:z.string(),
    content:z.string()
})

export type BlogCreateInput=z.infer<typeof blogCreateInput>

export const blogUpdateInput=z.object({
    title:z.string().optional(),
    content:z.string().optional()
})

export type BlogUpdateInput=z.infer<typeof blogUpdateInput>