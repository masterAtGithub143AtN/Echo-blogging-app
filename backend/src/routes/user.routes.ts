import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {sign ,verify,decode} from 'hono/jwt';
import { signinInput,SignupInput } from "@saket_12/medium-common";

export const userRoutes = new Hono<{
    Bindings:{
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();


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
    const body = await c.req.json()
    const { success } = signinInput.safeParse(body);
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
          password: body.password
        }
      })
      const jwt=await sign({
        id: user.id,
        username: user.username
      },c.env.JWT_SECRET);
  
      c.status(201);
      return c.text(jwt);
  
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
        username: user.username
      },c.env.JWT_SECRET);
  
      c.status(201);
      return c.json({
        token: jwt,
        user: {
            id: user.id,
            username: user.username
        }
      });
      
    } catch (error) {
      
    }
  
    return c.text('signin route')
  })