import Link from 'next/link'
import Layout from '../../../components/layout'
import ObjectNavigation from '../../../components/object-navigation'
import { useUser,useCMaterial } from '../../../lib/hooks'

const CMaterials = () => {
  const user = useUser()
  const cmaterial = useCMaterial()

  if (!cmaterial) {
    return null
  }

const tbody = !cmaterial.construction_materials ? null : cmaterial.construction_materials.map(c =>
  <Link href="/object/construction_materials/[id_construction_materials]" as={`/object/construction_materials/${c.id}`} key={c.id}>
    <tr className="hover:bg-gray-200">
      <td className="p-2">{c.orderDate}</td>
      <td className="p-2">{c.orderDistination}</td>
      <td className="p-2">{c.productName}</td>
      <td className="p-2">{c.productType}</td>
      <td className="p-2">{c.credit}</td>
      <td className="p-2">{c.quantity}</td>
      <td className="p-2">{c.unitPrice}</td>
      <td className="p-2">{c.price}</td>
      <td className="p-2">{c.wbs}</td>
      <td className="p-2">{c.constructionForShort}</td>
      <td className="p-2">{c.deliveryDate}</td>
      <td className="p-2">{c.payoutDate}</td>
      <td className="p-2">{c.Staff?.fullName}</td>
      <td className="p-2">{c.inventoryDate}</td>
   </tr>
  </Link>
 )
 return (
   <Layout>
     <ObjectNavigation page="construction_materials" />

     <Link href="/object/construction_materials/[id_construction_materials]" as="/object/construction_materials/new">
       <div className="mb-4 flex justify-end">
        <button type="link" disabled={!user.data}
                className={user.data ? "btn" : "btn-disabled"}>新規作成</button>
       </div>

     </Link>
     <table className="block overflow-x-scroll whitespace-no-wrap">
       <thead>
         <tr>
           <th className="text-left p-2">注文日</th>
           <th className="text-left p-2">注文先</th>
           <th className="text-left p-2">品名</th>
           <th className="text-left p-2">種類</th>
           <th className="text-left p-2">単位</th>
           <th className="text-left p-2">数量</th>
           <th className="text-left p-2">単価</th>
           <th className="text-left p-2">金額</th>
           <th className="text-left p-2">WBS</th>
           <th className="text-left p-2">工事略称</th>
           <th className="text-left p-2">納品日</th>
           <th className="text-left p-2">払い出し日</th>
           <th className="text-left p-2">担当者</th>
           <th className="text-left p-2">棚卸日</th>
         </tr>
       </thead>
       <tbody className="divide-y">
         {tbody}
       </tbody>
     </table>
   </Layout>
 )
}

export default CMaterials
