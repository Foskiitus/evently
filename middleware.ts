import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)',
    '/forum(.*)',
  ]);


  export default clerkMiddleware((auth, req) => {
    // Restrict admin routes to users with specific permissions
    if (isProtectedRoute(req)) {
      auth().protect(has => {
        return (
          has({ permission: 'org:sys_memberships:manage' }) ||
          has({ permission: 'org:sys_domains_manage' })
        )
      })
    }
  });

export const config = {
    matcher: [
      '/((?!.*\\..*|_next).*)', // Don't run middleware on static files
      '/', // Run middleware on index page
      '/(api|trpc)(.*)'], // Run middleware on API routes
  };