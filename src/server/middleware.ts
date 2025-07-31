export { auth as middleware } from "~/server/auth/config" // Adjust the import path as necessary

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}