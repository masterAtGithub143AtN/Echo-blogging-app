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
      const posts=await prisma.blog.findMany({
        include:{
            author:{
                select:{
                    username:true,
                    name:true
                }
            
            }
        }
      });
      if(posts){
        return c.json(posts);
      }
        else{
            c.status(404);
            throw c.text('No blogs found');
        }
    } catch (error) {
      console.log(error);
      throw c.text('Internal server error');
    }
  })



 blogRoutes.use("/*", async (c, next) => {
    const authHeader = c.req.header("Authorization") || "";
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
    const userDetails = c.get("userDetails");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
         //@ts-ignore
         const IdOfUser = userDetails.id;
        const post = await prisma.blog.findFirst({
            where: {
                id: Number(c.req.param("id")),
            },
            include:{
                author:{
                    select:{
                        username:true,
                        name:true
                    }
                }
            }
        })
        if (!post) {
            c.status(404);
            throw c.text('Blog not found')
        }
        return c.json(post);
    } catch (error) {
        console.log(error);
        throw c.text('Internal server error');
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


  blogRoutes.get("/public/:username", async (c) => {
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());
    try {
        const user=await prisma.user.findFirst({
            where:{
                username:c.req.param("username")
            },
            select:{
                id:true,
                username:true,
                name:true,
                profile:true,
                // imageUrl:true,
                blogs:{
                    select:{
                        id:true,
                        title:true,
                        content:true,
                        date:true,
                        thumbnail:true
                    }
                }
            }
        })
        if(user){
            c.status(200);
            return c.json(user);
        }
        else{
            c.status(404);
            return c.text('User not found');
        }
        
    } catch (error) {
        console.log(error);
        c.status(500);
        return c.text('Internal server error');
    }
  })

  blogRoutes.post ("/favorite/add/:id/:userid",async(c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());
    try {
        const blogId=Number(c.req.param("id"));
        const userId=Number(c.req.param("userid"));
        const existedFavorite=await prisma.favouriteList.findFirst({
            where:{
                blogId:blogId,
                userId:userId
            }
        })
        if(existedFavorite){
            c.status(409);
            return c.text('Blog already in favorites');
        }
        const favorite=await prisma.favouriteList.create({
            data:{
                blogId:blogId,
                userId:userId
            }
        })
        if(favorite){
            c.status(200);
            return c.json(favorite);
        }
        else{
            c.status(404);
            return c.text('Blog or user not found');
        }
    } catch (error) {
        console.log(error);
        c.status(500);
        return c.text('Internal server error');
    }

  })

  blogRoutes.get("/get/favorite/:username",async(c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());
    try {
        const user=await prisma.user.findFirst({
            where:{
                username:c.req.param("username")
            }
        })
        if(user){
            const favorite=await prisma.favouriteList.findMany({
                where:{
                    userId:user.id
                },
                include:{
                    blog:{
                        select:{
                            id:true,
                            title:true,
                            content:true,
                            date:true,
                            thumbnail:true
                        }
                    },
                    user:{
                        select:{
                            id:true,
                            username:true,
                            name:true
                        }
                    }
                }
            })
            if(favorite){
                c.status(200);
                return c.json(favorite);
            }
            else{
                c.status(404);
                return c.text('No favorite blogs found');
            }
        }
        else{
            c.status(404);
            return c.text('User not found');
        }
    } catch (error) {
        console.log(error);
        c.status(500);
        return c.text('Internal server error');
    }
  })


    blogRoutes.delete("/favorite/remove/:id/:userid",async(c)=>{
        const prisma=new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL
        }).$extends(withAccelerate());
        try {
            const favoriteId=Number(c.req.param("id"));
            const userId=Number(c.req.param("userid"));
            const favorite=await prisma.favouriteList.delete({
                where:{
                    id:favoriteId
                }
            })
            if(favorite){
                c.status(200);
                return c.text('Blog removed from favorites');
            }
            else{
                c.status(404);
                return c.text('Blog not found in favorites');
            }
        } catch (error) {
            console.log(error);
            c.status(500);
            return c.text('Internal server error');
        }
    })




    blogRoutes.get('/search', async (c) => {
        const searchText = c.req.query('query'); // Get the search text from the query parameter
      
        if (!searchText) {
          c.status(400);
          return c.text('Search query is required');
        }
      
        const prisma = new PrismaClient({
          datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
      
        try {
          const blogs = await prisma.blog.findMany({
            where: {
              OR: [
                { title: { contains: searchText, mode: 'insensitive' } },
                { content: { contains: searchText, mode: 'insensitive' } },
              ],
            },
            include: {
              author: {
                select: {
                  username: true,
                  name: true,
                  id: true,
                }
              }
            }
          });
          return c.json(blogs);
        } catch (error) {
          console.error('Error searching for blogs:', error);
          c.status(500);
          return c.text('Internal server error');
        }
      });

