import express from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/User/user.route';
import { ProfileRoutes } from '../modules/Profile/profile.route';
import { MeilisearchRoutes } from '../modules/Meilisearch/meilisearch.routes';
import { RecipeRoutes } from '../modules/Recipe/recipe.route';
import { CommentRoutes } from '../modules/Comments/comment.route';
import { RatingRoutes } from '../modules/Rating/rating.route';
import { paymentRoutes } from '../modules/Payment/payment.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/recipes',
    route: RecipeRoutes,
  },
  {
    path: '/comments',
    route: CommentRoutes,
  },
  {
    path: '/ratings',
    route: RatingRoutes,
  },
  {
    path: '/search-items',
    route: MeilisearchRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/profile',
    route: ProfileRoutes,
  },
  {
    path: '/confirmation',
    route: paymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
