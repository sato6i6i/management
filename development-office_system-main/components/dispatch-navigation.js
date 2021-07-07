import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useStaff } from '../lib/hooks'

const DispatchNavigation = ({ id, page }) => {
  const active = "text-center block border border-white hover:border-gray-200 \
                  text-white bg-gray-700 py-2 px-4"
  const inactive = "text-center block border border-white hover:border-gray-200 \
                    text-gray-700 hover:bg-gray-700 hover:text-white py-2 px-4"
                    
  return (
    <div className="mb-4">
      <ul className="flex">
        <li className="flex-1 mr-1">
          <Link href="/dispatch/[id]" as={`/dispatch/${id}`}>
            <a className={page == 'dispatch' ? active : inactive}>個人</a>
          </Link>
        </li>
        <li className="flex-1 mr-1">
          <Link href="/dispatch/[id]/qualifications" as={`/dispatch/${id}/qualifications`}>
            <a className={page == 'qualifications' ? active : inactive}>資格</a>
          </Link>
        </li>
        <li className="flex-1 mr-1">
          <Link href="/dispatch/[id]/projects" as={`/dispatch/${id}/projects`}>
            <a className={page == 'projects' ? active : inactive}>プロジェクト</a>
          </Link>
        </li>
        <li className="flex-1 mr-1">
          <Link href="/dispatch/[id]/contracts" as={`/dispatch/${id}/contracts`}>
            <a className={page == 'contracts' ? active : inactive}>契約(年度管理)</a>
          </Link>
        </li>
        <li className="flex-1 mr-1">
          <Link href="/dispatch/[id]/working_status" as={`/dispatch/${id}/working_status`}>
            <a className={page == 'working_status' ? active : inactive}>就業状況</a>
          </Link>
        </li>
        <li className="flex-1 mr-1">
          <Link href="/dispatch/[id]/companies" as={`/dispatch/${id}/companies`}>
            <a className={page == 'companies' ? active : inactive}>派遣元会社</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default DispatchNavigation