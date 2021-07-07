import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../../../components/layout'
import Navigation from '../../../../components/navigation'
import { useStaff, useRelative } from '../../../../lib/hooks'

const Relatives = () => {
  const router = useRouter()
  const s = useStaff(router.query.id)
  const [staff, setStaff] = useState()
  useEffect(() => {
    setStaff(Array.isArray(s.staff) ? s.staff[0] : '')
  }, [s.isLoading])
  const relatives = useRelative(staff && {staffId: staff.staffId} || '')

  if (!staff) {
    return null
  }

  const tbody = !relatives.relatives ? null : relatives.relatives.map(relative =>
    <Link href="/staff/[id]/relatives/[id_relative]" as={`/staff/${staff.id}/relatives/${relative.id}`} key={relative.id}>
      <tr className="hover:bg-gray-200">
        <td className="p-2">{relative.dependantReason}</td>
        <td className="p-2">{relative.fullName}</td>
        <td className="p-2">{relative.furigana}</td>
        <td className="p-2">{relative.relation}</td>
        <td className="p-2">{String(relative.isLiveWith)}</td>
        <td className="p-2">{relative.postalCode}</td>
        <td className="p-2">{relative.address1}</td>
        <td className="p-2">{relative.address2}</td>
        <td className="p-2">{relative.address3}</td>
        <td className="p-2">{relative.phoneNumber}</td>
      </tr>
    </Link>
  )

  return (
    <Layout>
      <Navigation id={staff.id} page="relatives" />

      <div className="flex items-center mb-2">
        <div className="w-1/3">
          <label className="form-inline-label">社員ID</label>
        </div>
        <div className="w-2/3">
          <div className="bg-gray-200 appearance-none border-2 border-gray-200 w-full py-2 px-4 text-gray-700 leading-tight">
            {staff.staffId}
          </div>
        </div>
      </div>

      <div className="flex items-center mb-8">
        <div className="w-1/3">
          <label className="form-inline-label">氏名</label>
        </div>
        <div className="w-2/3">
          <div className="bg-gray-200 appearance-none border-2 border-gray-200 w-full py-2 px-4 text-gray-700 leading-tight">
            {staff.fullName}
          </div>
        </div>
      </div>

      <Link href="/staff/[id]/relatives/[id_relative]" as={`/staff/${staff.id}/relatives/new`}>
        <div className="mb-4 flex justify-end">
          <button type="link" className="btn">新規作成</button>
        </div>
      </Link>

      <table className="block overflow-x-scroll whitespace-no-wrap">
        <thead>
          <tr>
            <th className="text-left p-2">扶養事由</th>
            <th className="text-left p-2">氏名</th>
            <th className="text-left p-2">フリガナ</th>
            <th className="text-left p-2">続柄</th>
            <th className="text-left p-2">同居区分</th>
            <th className="text-left p-2">郵便番号</th>
            <th className="text-left p-2">住所1</th>
            <th className="text-left p-2">住所2</th>
            <th className="text-left p-2">住所3</th>
            <th className="text-left p-2">電話番号</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {tbody}
        </tbody>
      </table>
    </Layout>
  )
}

export default Relatives
