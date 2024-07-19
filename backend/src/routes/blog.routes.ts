import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify, decode } from "hono/jwt"
import { JWTPayload } from "hono/utils/jwt/types";
import { blogCreateInput,blogUpdateInput } from "@saket_12/medium-common";


export const blogRoutes = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userDetails: object
    }
}>();



blogRoutes.get('/bulk',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
      const posts=await prisma.blog.findMany();
      return c.json(posts);
    } catch (error) {
      console.log(error);
      return c.text('Internal server error');
    }
  })



blogRoutes.use("/*", async (c, next) => {
    const authHeader = c.req.header("Autharization") || "";
    if (!authHeader) {
        c.status(401);
        return c.text("provide a token  in the header");
    }

    console.log("authHeader", authHeader);
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        console.log("user", user);
        if (user) {
            c.set("userDetails", user);
            await next();
        }
        else {
            c.status(401);
            return c.text("Unauthorized");
        }
    } catch (error) {
        console.log("error", error);
        c.status(501);
        return c.text("Something is wrong with the token or the secret key or the token has expired or the token is invalid or the token is not provided");
    }
})


blogRoutes.post('/create', async (c) => {
    const userDetails = c.get("userDetails");
    //@ts-ignore
    console.log(userDetails.id);
    console.log(userDetails);
    const body = await c.req.json();
    const { success } = blogCreateInput.safeParse(body);
    if (!success) {
        c.status(400);
        return c.text('Invalid input');
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const post = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                //@ts-ignore
                authorId: userDetails.id
            }
        });

        return c.json(post);

    } catch (error) {
        console.log(error);
    }

    return c.text('Create blog route')
})




blogRoutes.put('/update/:id', async (c) => {
    const body = await c.req.json();
    const { success } = blogUpdateInput.safeParse(body);
    if (!success) {
        c.status(400);
        return c.text('Invalid input');
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const id = c.req.param("id");
        const userDetails =c.get("userDetails");
        //@ts-ignore
        const IdOfUser = userDetails.id;
        const updateData = await prisma.blog.update({
            where: {
                id: Number(id),
                authorId: IdOfUser
            },
            data: {
                title: body.title,
                content: body.content
            }
        })
        if (updateData) {
            return c.text('Blog updated successfully')
        }
        else {
            console.log("Blog not found");
            c.status(404);
            return c.text('Blog not found')
        }
    } catch (error) {
        console.log("error with catch", error);
        c.status(500);
        return c.text('Internal server error');
    }
})


blogRoutes.get('/read/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
         //@ts-ignore
         const IdOfUser = userDetails.id;
        const post = await prisma.blog.findFirst({
            where: {
                authorId: IdOfUser,
                id: Number(c.req.param("id"))
            }
        })
        if (!post) {
            c.status(404);
            return c.text('Blog not found')
        }
        return c.json(post);
    } catch (error) {
        console.log(error);
        return c.text('Internal server error');
    }
})




blogRoutes.get('/read', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const userDetails = c.get("userDetails");
         //@ts-ignore
         const IdOfUser = userDetails.id;
        const post = await prisma.blog.findMany({
            where: {
                authorId: IdOfUser
            }
        })
        if (!post) {
            c.status(404);
            return c.text('Blog not found')
        }
        return c.json(post);
    } catch (error) {
        console.log(error);
        return c.text('Internal server error');
    }
})