import { Hono } from 'hono';
import { userRoutes } from './routes/user.routes';
import {blogRoutes} from './routes/blog.routes'
import { cors } from 'hono/cors';

// Create the main Hono app
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>();

app.use('*',cors());

app.route('/api/v1/user', userRoutes);
app.route('/api/v1/blog',blogRoutes);



app.get('/', (c) => {
  return c.text('Hello World')
})

export default app;
