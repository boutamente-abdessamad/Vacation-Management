import React from 'react'
import Link from 'next/link'


type Props = {
  url : string,
  linkText : string,
  description : string,
  icon : React.ReactNode
}

export default function Card({ url ,linkText,description,icon} : Props) {
  return (
    <div className="p-4 bg-white border rounded-xl text-gray-800 space-y-2 ">
        <Link href={url} className="font-bold hover:text-yellow-800 hover:underline">{linkText}</Link>
        <div className="text-sm text-gray-600">
            {icon} {description}
        </div>
    </div>
  )
}