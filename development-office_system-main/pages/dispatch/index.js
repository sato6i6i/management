import Link from 'next/link'
import Layout from '../../components/layout'
import { useUser, useDispatch } from '../../lib/hooks'

const Dispatch = () => {
  const user = useUser()
  const dispatch = useDispatch()

  if (!dispatch) {
    return null
  }

  const tbody = !dispatch.dispatch ? null : dispatch.dispatch.map(d =>
    <Link href="/dispatch/[id]" as={`/dispatch/${d.id}`} key={d. id}>
      <tr className="hover:bg-gray-200">
        <td className="p-2">{d.companyNumber}</td>
        <td className="p-2">{d.username}</td>
        <td className="p-2">{d.furigana}</td>
      </tr>
    </Link>
  )

  return (
    <Layout>
      <Link href="/dispatch/[id]" as="/dispatch/new">
        <div className="mb-4 flex justify-end">
          <button type="link" disabled={!user.data}
                  className={user.data ? "btn" : "btn-disabled"}>新規作成</button>
        </div>
      </Link>
      <table className="container table-fixed">
        <thead>
          <tr>
            <th className="text-left p-2 w-1/3">カンパニー番号</th>
            <th className="text-left p-2 w-1/3">氏名</th>
            <th className="text-left p-2 w-1/3">フリガナ</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {tbody}
        </tbody>
      </table>

      <style jsx>{`
      `}</style>
    </Layout>
  )
}

export default Dispatch
