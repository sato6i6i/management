import Link from 'next/link'
import Layout from '../../../components/layout'
import ObjectNavigation from '../../../components/object-navigation'
import { useUser,useHoldOnto } from '../../../lib/hooks'

const HoldOntos = () => {
  const user = useUser()
  const holdonto = useHoldOnto()



  if (!holdonto) {
    return null
  }

  const tbody = !holdonto.hold_onto ? null : holdonto.hold_onto.map(h =>
    <Link href="/object/hold_onto/[id_hold_onto]" as={`/object/hold_onto/${h.id}`} key={h.id}>
      <tr className="hover:bg-gray-200">
        <td className="p-2">{h.productName}</td>
        <td className="p-2">{h.serialCode}</td>
        <td className="p-2">{h.customerS?.fullName}</td>
        <td className="p-2">{h.getDate}</td>
        <td className="p-2">{h.getS?.fullName}</td>
        <td className="p-2">{h.storagePeriod}</td>
        <td className="p-2">{h.storagePlace}</td>
        <td className="p-2">{h.payoutDate}</td>
        <td className="p-2">{h.payoutS?.fullName}</td>
        <td className="p-2">{h.projectTitle}</td>
        <td className="p-2">{h.status}</td>
      </tr>
    </Link>
   )

   return (
     <Layout>
       <ObjectNavigation page="hold_onto" />

       <Link href="/object/hold_onto/[id_hold_onto]" as="/object/hold_onto/new">

         <div className="mb-4 flex justify-end">
          <button type="link" disabled={!user.data}
                  className={user.data ? "btn" : "btn-disabled"}>新規作成</button>
         </div>

       </Link>

       <table className="block overflow-x-scroll whitespace-no-wrap">
         <thead>
           <tr>
             <th className="text-left p-2">品名</th>
             <th className="text-left p-2">シリアル</th>
             <th className="text-left p-2">お客様担当者</th>
             <th className="text-left p-2">受入日</th>
             <th className="text-left p-2">受領者</th>
             <th className="text-left p-2">保管期限</th>
             <th className="text-left p-2">保管場所</th>
             <th className="text-left p-2">払い出し日</th>
             <th className="text-left p-2">払い出し者</th>
             <th className="text-left p-2">案件名</th>
             <th className="text-left p-2">ステータス</th>
           </tr>
         </thead>
         <tbody className="divide-y">
           {tbody}
         </tbody>
       </table>
     </Layout>


  )
}

export default HoldOntos
