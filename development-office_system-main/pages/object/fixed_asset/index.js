import Link from 'next/link'
import Layout from '../../../components/layout'
import ObjectNavigation from '../../../components/object-navigation'
import { useUser,useFixedAsset } from '../../../lib/hooks'

const FixedAssets = () => {
  const user = useUser()
  const assets = useFixedAsset()

  if (!assets) {
    return null
  }

const tbody = !assets.fixed_asset ? null : assets.fixed_asset.map(a =>
  <Link href="/object/fixed_asset/[id_fixed_asset]" as={`/object/fixed_asset/${a.id}`} key={a.id}>
    <tr className="hover:bg-gray-200">
      <td className="p-2">{a.assetsCode}</td>
      <td className="p-2">{a.assetsType}</td>
      <td className="p-2">{a.assetsName}</td>
      <td className="p-2">{a.quantity}</td>
      <td className="p-2">{a.getDate}</td>
      <td className="p-2">{a.commonDate}</td>
      <td className="p-2">{a.userName}</td>
      <td className="p-2">{a.usePlace}</td>
      <td className="p-2">{a.getPrice}</td>
      <td className="p-2">{a.tax}</td>
      <td className="p-2">{a.taxRate}</td>
      <td className="p-2">{a.remainPrice}</td>
      <td className="p-2">{a.repaymentMethod}</td>
      <td className="p-2">{a.serviceLife}</td>
      <td className="p-2">{a.currentTermRepayment}</td>
      <td className="p-2">{a.endOfTermBookValue}</td>
      <td className="p-2">{a.repaymentWbscode}</td>
      <td className="p-2">{a.repaymentWbsname}</td>
      <td className="p-2">{a.other}</td>
      <td className="p-2">{a.inventoryDate}</td>
      <td className="p-2">{a.StaffId?.fullName}</td>
      <td className="p-2">{a.note}</td>
   </tr>
  </Link>
 )
 return (
   <Layout>
     <ObjectNavigation page="fixed_asset" />

     <Link href="/object/fixed_asset/[id_fixed_asset]" as="/object/fixed_asset/new">
       <div className="mb-4 flex justify-end">
        <button type="link" disabled={!user.data}
                className={user.data ? "btn" : "btn-disabled"}>新規作成</button>
       </div>

     </Link>
     <table className="block overflow-x-scroll whitespace-no-wrap">
       <thead>
         <tr>
           <th className="text-left p-2">資産コード</th>
           <th className="text-left p-2">種別</th>
           <th className="text-left p-2">資産名</th>
           <th className="text-left p-2">数量</th>
           <th className="text-left p-2">取得日付</th>
           <th className="text-left p-2">供用日付</th>
           <th className="text-left p-2">利用者氏名</th>
           <th className="text-left p-2">使用場所</th>
           <th className="text-left p-2">取得価格</th>
           <th className="text-left p-2">消費税</th>
           <th className="text-left p-2">消費税率</th>
           <th className="text-left p-2">残存価格</th>
           <th className="text-left p-2">償却方法</th>
           <th className="text-left p-2">耐用年数</th>
           <th className="text-left p-2">当期償却額</th>
           <th className="text-left p-2">期末帳簿価格</th>
           <th className="text-left p-2">償却WBSコード</th>
           <th className="text-left p-2">償却WBS名</th>
           <th className="text-left p-2">その他</th>
           <th className="text-left p-2">棚卸年月日</th>
           <th className="text-left p-2">担当者</th>
           <th className="text-left p-2">備考</th>
         </tr>
       </thead>
       <tbody className="divide-y">
         {tbody}
       </tbody>
     </table>
   </Layout>
 )
}

export default FixedAssets
