import { NextResponse } from 'next/server'

export async function GET(){
    const response = NextResponse.json({message:"Logged out!!!"})

    response.cookies.set('authToken','',{
        maxAge:0,
        path:'/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    })

    return response
}