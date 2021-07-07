import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useStaff } from '../lib/hooks'


const ObjectNavigation = ({ page }) => {
  const active = "text-center block border border-white hover:border-gray-200 \
                  text-white bg-gray-700 py-2 px-2"
  const inactive = "text-center block border border-white hover:border-gray-200 \
                    text-gray-700 hover:bg-gray-700 hover:text-white py-2 px-2"
                    
  return (
    <div className="mb-4">
      <ul className="flex">
        <li className="flex-1 mr-1">
          <Link href="/object/hold_onto">
            <a className={page == 'hold_onto' ? active : inactive}>預かり品</a>
          </Link>
        </li>
        <li className="flex-1 mr-1">
          <Link href="/object/construction_materials">
            <a className={page == 'construction_materials' ? active : inactive}>工事材料</a>
          </Link>
        </li>
        <li className="flex-1 mr-1">
          <Link href="/object/lease_rental_pc">
            <a className={page == 'lease_rental_pc' ? active : inactive}>PC</a>
          </Link>
        </li>
        <li className="flex-1 mr-1">
          <Link href="/object/phone_wifi">
            <a className={page == 'phone_wifi' ? active : inactive}>携帯・wifi</a>
          </Link>
        </li>
        <li className="flex-1 mr-1">
          <Link href="/object/fixed_asset">
            <a className={page == 'fixed_asset' ? active : inactive}>固定資産</a>
          </Link>
        </li>
        <li className="flex-1 mr-1">
          <Link href="/object/disaster_stockpile">
            <a className={page == 'disaster_stockpile' ? active : inactive}>災害備蓄品</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default ObjectNavigation