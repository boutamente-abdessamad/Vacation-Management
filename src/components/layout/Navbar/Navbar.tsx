
import React from 'react'
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@api/auth/[...nextauth]/route";
type Props = {}

export default async function Navbar({}: Props) {
  const authSession = await getServerSession(nextAuthOptions); 
  return (
    <header className="fixed z-10 right-0 top-0 left-60 bg-yellow-50 py-3 px-4 h-16">
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-center">
        <div className="text-lg font-bold">Hello {authSession.user.last_name } {authSession.user.first_name }</div>
      </div>
    </div>
  </header>
  )
}