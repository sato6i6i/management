import Link from 'next/link'
import Layout from '../../../components/layout'
import ObjectNavigation from '../../../components/object-navigation'
import { useUser,useDisasterStockpile } from '../../../lib/hooks'

const DisasterStockpiles = () => {
  const user = useUser()
  const disasterStockpile = useDisasterStockpile()

  if (!disasterStockpile) {
    return null
  }

const tbody = !disasterStockpile.disaster_stockpile ? null : disasterStockpile.disaster_stockpile.map(d =>
  <Link href="/object/disaster_stockpile/[id_disaster_stockpile]" as={`/object/disaster_stockpile/${d.id}`} key={d.id}>
    <tr className="hover:bg-gray-200">
      <td className="p-2">{d.comfirmDate}</td>
      <td className="p-2">{d.productName}</td>
      <td className="p-2">{d.buyQuantity}</td>
      <td className="p-2">{d.boxes}</td>
      <td className="p-2">{d.stock}</td>
      <td className="p-2">{d.retailer}</td>
      <td className="p-2">{d.buyPrice}</td>
      <td className="p-2">{d.storagePeriod}</td>
      <td className="p-2">{d.status}</td>
      <td className="p-2">{d.storagePlace}</td>
      <td className="p-2">{d.note1}</td>
      <td className="p-2">{d.note2}</td>
      <td className="p-2">{d.newApprovalDoc}</td>
      <td className="p-2">{d.Staff?.fullName}</td>
   </tr>
  </Link>
 )
 return (
   <Layout>
     <ObjectNavigation page="disaster_stockpile" />

     <Link href="/object/disaster_stockpile/[id_disaster_stockpile]" as="/object/disaster_stockpile/new">
       <div className="mb-4 flex justify-end">
        <button type="link" disabled={!user.data}
                className={user.data ? "btn" : "btn-disabled"}>新規作成</button>
       </div>

     </Link>
     <table className="block overflow-x-scroll whitespace-no-wrap">
       <thead>
         <tr>
           <th className="text-left p-2">確認日</th>
           <th className="text-left p-2">品名</th>
           <th className="text-left p-2">購入数</th>
           <th className="text-left p-2">箱数</th>
           <th className="text-left p-2">在庫数</th>
           <th className="text-left p-2">購入先</th>
           <th className="text-left p-2">購入金額（税込）</th>
           <th className="text-left p-2">保管期限</th>
           <th className="text-left p-2">ステータス</th>
           <th className="text-left p-2">保管場所</th>
           <th className="text-left p-2">備考①</th>
           <th className="text-left p-2">備考②</th>
           <th className="text-left p-2">稟議書作成日</th>
           <th className="text-left p-2">担当者</th>
         </tr>
       </thead>
       <tbody className="divide-y">
         {tbody}
       </tbody>
     </table>
   </Layout>
 )
}

export default DisasterStockpiles
