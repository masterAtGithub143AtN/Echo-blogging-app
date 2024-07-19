import { Hono } from 'hono';
import { sign, verify } from 'hono/jwt';
import { JWTPayload } from 'hono/utils/jwt/types';

const app = new Hono<{
    Bindings: {
        JWT_SECRET: string;
    },
    Variables: {
        userDetails: object
    }   
}>();

const JWT_SECRET = 'your-secret-key';



// Middleware to authenticate user
app.use('/secure/*', async (c, next) => {
  const authHeader = c.req.header('Authorization') || '';
  try {
    const user = await verify(authHeader, JWT_SECRET);
    c.set('userDetails', user);
    await next();
  } catch (error) {
    c.status(401);
    return c.text('Unauthorized');
  }
});

// Login route to issue JWT token
app.post('/login', async (c) => {
  const { id, name } = await c.req.json();
  const token = await sign({ id, name }, JWT_SECRET);
  return c.json({ token });
});

// Secure route accessible only by authenticated users
app.get('/secure/data', (c) => {
  const user = c.get('userDetails');
  //@ts-ignore
  return c.json({ message: `Hello, ${user.name}`, user });
});

export default app;
