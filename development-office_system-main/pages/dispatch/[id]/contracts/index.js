import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../../../components/layout'
import DispatchNavigation from '../../../../components/dispatch-navigation'
import { useDispatch, useContract } from '../../../../lib/hooks'

const Contracts = () => {
  const router = useRouter()
  const d = useDispatch(router.query.id)
  const [dispatch, setDispatch] = useState()
  useEffect(() => {
    setDispatch(Array.isArray(d.dispatch) ? d.dispatch[0] : '')
  }, [d.isLoading])
  const contracts = useContract(dispatch && {dispatchedStaffId: dispatch.dispatchedStaffId} || '')

  if (!dispatch) {
    return null
  }

  const tbody = !contracts.contracts ? null : contracts.contracts.map(contract =>
    <Link href="/dispatch/[id]/contracts/[id_contract]"
          as={`/dispatch/${dispatch.id}/contracts/${contract.id}`} key={contract.id}>
      <tr className="hover:bg-gray-200">
        <td className="p-2">{contract.joinDate}</td>
        <td className="p-2">{contract.retiredDate}</td>
        <td className="p-2">{contract.contractEndDate}</td>
      </tr>
    </Link>
  )

  return (
    <Layout>
      <DispatchNavigation id={dispatch.id} page="contracts" />

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

      <Link href="/staff/[id]/projects/[id_project]" as={`/dispatch/${dispatch.id}/contracts/new`}>
        <div className="mb-4 flex justify-end">
          <button type="link" className="btn">新規作成</button>
        </div>
      </Link>

      <table className="block overflow-x-scroll whitespace-no-wrap">
        <thead>
          <tr>
            <th className="text-left p-2 w-1/4">入社年月日</th>
            <th className="text-left p-2 w-1/4">退職年月日</th>
            <th className="text-left p-2 w-1/4">契約満了年月日</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {tbody}
        </tbody>
      </table>
    </Layout>
  )
}

export default Contracts
