import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../../../components/layout'
import DispatchNavigation from '../../../../components/dispatch-navigation'
import { useDispatch, useCompany } from '../../../../lib/hooks'

const Companies = () => {
  const router = useRouter()
  const d = useDispatch(router.query.id)
  const [dispatch, setDispatch] = useState()
  useEffect(() => {
    setDispatch(Array.isArray(d.dispatch) ? d.dispatch[0] : '')
  }, [d.isLoading])
  const companies = useCompany(dispatch && {dispatchedStaffId: dispatch.dispatchedStaffId} || '')

  if (!dispatch) {
    return null
  }

  const tbody = !companies.companies ? null : companies.companies.map(company =>
    <Link href="/dispatch/[id]/companies/[id_company]"
          as={`/dispatch/${dispatch.id}/companies/${company.id}`} key={company.id}>
      <tr className="hover:bg-gray-200">
        <td className="p-2">{company.companyName}</td>
        <td className="p-2">{company.companyOverview}</td>
        <td className="p-2">{company.businessType}</td>
        <td className="p-2">{company.postalCode}</td>
        <td className="p-2">{company.address}</td>
        <td className="p-2">{company.phoneNumber}</td>
        <td className="p-2">{company.mailAddress}</td>
      </tr>
    </Link>
  )

  return (
    <Layout>
      <DispatchNavigation id={dispatch.id} page="companies" />

      <div className="flex items-center mb-2">
        <div className="w-1/3">
          <label className="form-inline-label">カンパニー番号</label>
        </div>
        <div className="w-2/3">
          <div className="bg-gray-200 appearance-none border-2 border-gray-200 w-full py-2 px-4 text-gray-700 leading-tight">
            {dispatch.companyNumber}
          </div>
        </div>
      </div>

      <div className="flex items-center mb-8">
        <div className="w-1/3">
          <label className="form-inline-label">氏名</label>
        </div>
        <div className="w-2/3">
          <div className="bg-gray-200 appearance-none border-2 border-gray-200 w-full py-2 px-4 text-gray-700 leading-tight">
            {dispatch.username}
          </div>
        </div>
      </div>

      <Link href="/dispatch/[id]/companies/[id_company]" as={`/dispatch/${dispatch.id}/companies/new`}>
        <div className="mb-4 flex justify-end">
          <button type="link" className="btn">新規作成</button>
        </div>
      </Link>

      <table className="container table-fixed">
        <thead>
          <tr>
            <th className="text-left p-2 w-1/4">会社名</th>
            <th className="text-left p-2 w-1/4">会社概要</th>
            <th className="text-left p-2 w-1/2">業務種類</th>
            <th className="text-left p-2 w-1/2">郵便番号</th>
            <th className="text-left p-2 w-1/2">住所</th>
            <th className="text-left p-2 w-1/2">連絡先</th>
            <th className="text-left p-2 w-1/2">メールアドレス</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {tbody}
        </tbody>
      </table>
    </Layout>
  )
}

export default Companies
