import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from 'hono/jwt';
import { signinInput, SignupInput } from "@saket_12/medium-common";
import jwtDecode from 'jwt-decode';  // Correct import

export const userRoutes = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

interface UserDetailsValidation {
    id: number;
    username: string;
    name: string;
}






//SIGNUP ROUTE PLEASE LOOK AT THE COMMENTS BELOW
//This route is used to create a new user in the database
//The user sends a POST request to the /signup endpoint with the following body:
// {
//     "username": "user1",
//     "name": "John Doe",
//     "password": "user_password"
// }
//The route then creates a new user in the database with the provided details
//If the user already exists, the route returns a 411 status code with the message "User already exists with this email"
//If the user is created successfully, the route returns a 201 status code with a JWT token
//The JWT token contains the user's id and username
//The JWT token is signed using the JWT_SECRET environment variable

userRoutes.post('/signup', async(c) => {
    console.log('signup route')
    const body = await c.req.json()
    const { success } = signinInput.safeParse(body);
    console.log("success",success)
    if (!success) {
      c.status(400);
      return c.text('Invalid input');
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
      const user=await prisma.user.create({
        data:{
          username: body.username,
          name: body.name,
          password: body.password,
          collegename: body.collegename,
          email:body.email,
          course: body.course,
          semester: body.semester,
          passingyear: body.passingyear,
          branch: body.branch,
          profile: body.profile
        }
      })
      const jwt=await sign({
        id: user.id,
        username: user.username,
        name: user.name
      },c.env.JWT_SECRET);
  
      c.status(201);
      return c.json({
        token: jwt,
        user: {
            id: user.id,
            username: user.username,
            name: user.name
        }
      });
  
    } catch (error) {
      console.log(error);
      c.status(411);
      return c.text('User already exists with this email')
    }
    return c.text('signup route')
  })




//SIGNIN ROUTE PLEASE LOOK AT THE COMMENTS BELOW
//This route is used to authenticate a user
//The user sends a POST request to the /signin endpoint with the following body:
// {
//     "username": "user1",
//     "password": "user_password"
// }
//The route then checks if the user exists in the database
//If the user exists, the route returns a 201 status code with a JWT token  
//The JWT token contains the user's id and username
//The JWT token is signed using the JWT_SECRET environment variable
//If the user does not exist, the route returns a 403 status code with the message "Invalid username or password"

  
userRoutes.post('/signin', async(c) => {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
      c.status(400);
      return c.text('Invalid input');
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    try {
  
      const user=await prisma.user.findFirst({
        where:{
          username: body.username,
          password: body.password
        }
      })
      if(!user){
        c.status(403);
        return c.text('Invalid username or password');
      }
      const jwt=await sign({
        id:user.id,
        username: user.username,
        name:user.name
      },c.env.JWT_SECRET);
  
      c.status(201);
      return c.json({
        token: jwt,
        user: {
            id: user.id,
            username: user.username,
            name: user.name
        }
      });
      
    } catch (error) {
      
    }
  
    return c.text('signin route')
  })







userRoutes.use("/*", async (c, next) => {
  // console.log("auth middleware");
    const authHeader = c.req.header("Authorization") || "";
    
    if (!authHeader) {
        c.status(401);
        return c.text("Provide a token in the header");
    }

    // console.log("authHeader", authHeader);
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        // console.log("user", user);

        if (user) {
            await next();
        } else {
            c.status(401);
            return c.text("Unauthorized");
        }
    } catch (error) {
        console.error("Error verifying token:", error);
        c.status(401);  // Changed to 401 for unauthorized access
        return c.text("Invalid token or token has expired");
    }
});




 userRoutes.post("/:username/about/update",async(c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body=await c.req.json();
    try {
        const user=await prisma.user.update({
            where:{
                username: c.req.param("username")
            },
            data:{
                about: body.about
            }
        })
        return c.json(user.about);
    } catch (error) {
        console.log(error);
        return c.text("Error updating about information");
    }
}
)





userRoutes.get("/:username/about",async(c)=>{
  // console.log("about route")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const user=await prisma.user.findFirst({
        where:{
            username: c.req.param("username")
        }
    })
    if(!user){
        c.status(405);
        
        return c.text("User not found");
    }
    console.log("userAbout",user.about);
    return c.json(user.about);
})



userRoutes.get("/details/:username",async(c)=>{
  const prisma=new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL
  }).$extends(withAccelerate());
  try {
    const user=await prisma.user.findFirst({
      where:{
        username: c.req.param("username")
      },
      select:{
        id:true,
        username:true,
        name:true,
        email:true,
        collegename:true,
        course:true,
        semester:true,
        passingyear:true,
        branch:true,
        profile:true,
        about:true
      }
    })
    if(!user){
      c.status(405);
      return c.text("User not found");
    }
    return c.json(user);
  } catch (error) {
    console.log(error);
    return c.text("Error fetching user details");
  }
})


userRoutes.post("/:username/update",async(c)=>{
  const prisma=new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL
  }).$extends(withAccelerate());
  const body=await c.req.json();
  try {
    const authHeader = c.req.header("Authorization") || "";
    
    const decodeduser=await verify(authHeader, c.env.JWT_SECRET);
    if(decodeduser.username!==c.req.param("username")){
      c.status(401);
      return c.text("Unauthorized");
    }
    const user=await prisma.user.update({
      where:{
        username:c.req.param("username")
      },
      data:{
        username:body.username,
        name:body.name,
        email:body.email,
        collegename:body.collegename,
        course:body.course,
        semester:body.semester,
        passingyear:body.passingyear,
        branch:body.branch,
        profile:body.profile
      }
    })
    const jwt=await sign({
      id:user.id,
      username: user.username,
      name:user.name
    },c.env.JWT_SECRET);
    return c.json({
      token:jwt,
      user
    });
  } catch (error) {
    console.log(error);
    return c.text("Error updating user details");
  }
})

