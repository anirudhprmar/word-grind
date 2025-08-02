export { auth as middleware } from "~/server/auth" 

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
//if already cookie is present then redirect back to the dashboard