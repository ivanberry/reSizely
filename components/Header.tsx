/**
 * 根据配置来实现顶部导航栏
 * @constructor
 */

import Link from 'next/link'
import { useContext } from 'react'
import { CategoryContext } from '../pages/_app'

export default function Header() {
  const value = useContext(CategoryContext)
  return (
    <ul className={'flex flex-row'}>
      <li className="px-6 py-3">
        <Link href="/">Index</Link>
      </li>
      {value.map((item) => (
        <li className={'px-6 py-3'}>
          <Link href={`/category/${item.name}`}>{item.name}</Link>
        </li>
      ))}
    </ul>
  )
}
