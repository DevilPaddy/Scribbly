import { NextResponse, NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get('authToken')
  const verifyEmailToken = cookieStore.get('verifyEmail')
  const pathname = request.nextUrl.pathname

  const publicRoutes = ['/login', '/signup']
  const protectedRoutes = [
    '/',
    '/create-notes',
    '/to-do-list',
    '/to-do-create',
    '/profile',
    '/logout',
  ]

  console.log('Current Path:', pathname)
  console.log('Token:', token?.value)

  // ✅ Handle /verify-email
  if (pathname === '/verify-email') {
    if (!token?.value && verifyEmailToken?.value) {
      return NextResponse.next()
    }
    return NextResponse.redirect(new URL('/home', request.url))
  }

  // ✅ If no token
  if (!token?.value) {
    if (protectedRoutes.includes(pathname)) {
      console.log('Redirecting to /login because token missing on protected route')
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next() // allow access to public routes
  }

  // ✅ Try to verify token
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    await jwtVerify(token.value, secret)
  } catch (err) {
    console.error('JWT verification failed:', err)
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // ✅ If already logged in and visiting /login or /signup, redirect to /home
  if (publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  return NextResponse.next()
}
