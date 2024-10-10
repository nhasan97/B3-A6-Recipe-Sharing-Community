import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getCurrentUser } from "./services/AuthService";
import { TRole } from "./types/user.type";

const AuthRoutes = ["/login", "/register"];
export const roleBasedRoutes = {
  USER: [/^\/user-dashboard/], //regex for matching all the paths starting with profile
  ADMIN: [/^\/admin-dashboard/], //regex for matching all the paths starting with admin
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl; //getting the path that the user is trying to access

  const user = await getCurrentUser();

  //1. if user doesn't exist
  if (!user) {
    /*1.1 and wants to access path 
    that matches AuthRoutes which are login or register*/
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next(); //1.2 let the user goto login or register
    } /*1.3 and wants to access path 
    that doesn't match AuthRoutes which are login or register 
    leading to a conclusion that he/she is trying to 
    access a protected route without being authenticated*/ else {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      ); //1.4then redirect user to login
    }
  }

  //2. if user exists
  if (user?.role && roleBasedRoutes[user?.role as TRole]) {
    const routes = roleBasedRoutes[user?.role as TRole]; //assigning role based routes in routes variable

    //2.1 and wants to access a routes that is allowed for the use's role
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next(); //2.2 let the user access the route
    }
  }

  /*2.2. after matching paths using matcher if user role is 
  not allowed for accessing the particular route then redirecting to home*/
  return NextResponse.redirect(new URL("/", request.url));
}

// Matching Paths that are to be protected
//middleware is triggered only for these routes
export const config = {
  matcher: [
    "/user-dashboard",
    "/user-dashboard/:page*",
    "/admin-dashboard",
    "/admin-dashboard/:page*",
    "/login",
    "/register",
  ],
};
