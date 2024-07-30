import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
import getOrCreateDB from './models/server/dbSetup'
import getOrCreateStorage from './models/server/storageSetup'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

  await Promise.all([
    getOrCreateDB(),
    getOrCreateStorage(),  // Assuming this function returns a Promise
  ])
  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
    /*
    match all request paths exept for the ones that start with:
    start with:
    - api
    - _next/static
    - _next/image
    - _favicon.com 

    */
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    
  ],
}


///This files cames from 
// https://nextjs.org/docs/app/building-your-application/routing/middleware