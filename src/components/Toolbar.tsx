import React from 'react'
import { Button } from 'antd';

type ToolbarProps = {
  buttonTitle : string
  title: string
  onClick: () => void
}

export default function Toolbar({
  buttonTitle,
  title,
  onClick
}: ToolbarProps) {
  return (
    <div className="flex justify-between items-center bg-white  shadow-md p-4 rounded-md mb-4">
        <h2 className="text-md font-bold">
            {title}
        </h2>
        <Button type="primary" onClick={onClick}>{buttonTitle}</Button>
    </div>
  )

}