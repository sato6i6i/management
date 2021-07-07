import Link from 'next/link'
import Layout from '../../../components/layout'
import ObjectNavigation from '../../../components/object-navigation'
import { useUser,usePhone } from '../../../lib/hooks'

const PhoneWifis = () => {
  const user = useUser()
  const phone = usePhone()

  if (!phone) {
    return null
  }

const tbody = !phone.phone_wifi ? null : phone.phone_wifi.map(ph =>
  <Link href="/object/phone_wifi/[id_phone_wifi]" as={`/object/phone_wifi/${ph.id}`} key={ph.id}>
    <tr className="hover:bg-gray-200">
      <td className="p-2">{ph.telephoneNumber}</td>
      <td className="p-2">{ph.carrier}</td>
      <td className="p-2">{ph.typeTelWifi}</td>
      <td className="p-2">{ph.userName}</td>
      <td className="p-2">{ph.modelNumber}</td>
      <td className="p-2">{ph.modelName}</td>
      <td className="p-2">{ph.processName}</td>
      <td className="p-2">{ph.newBuyDate}</td>
      <td className="p-2">{ph.modelChangeDate}</td>
      <td className="p-2">{ph.buyMethod}</td>
      <td className="p-2">{ph.buyPrice}</td>
      <td className="p-2">{ph.firstTimeModelPrice}</td>
      <td className="p-2">{ph.modelMonthly}</td>
      <td className="p-2">{ph.sharepackEntry}</td>
      <td className="p-2">{ph.contractStart}</td>
      <td className="p-2">{ph.contractEnd}</td>
      <td className="p-2">{ph.processReqDate}</td>
      <td className="p-2">{ph.processCompDate}</td>
      <td className="p-2">{ph.note}</td>
      <td className="p-2">{ph.StaffId?.fullName}</td>
      <td className="p-2">{ph.monthly}</td>
   </tr>
  </Link>
 )
 return (
   <Layout>
     <ObjectNavigation page="phone_wifi" />

     <Link href="/object/phone_wifi/[id_phone_wifi]" as="/object/phone_wifi/new">
       <div className="mb-4 flex justify-end">
        <button type="link" disabled={!user.data}
                className={user.data ? "btn" : "btn-disabled"}>新規作成</button>
       </div>

     </Link>
     <table className="block overflow-x-scroll whitespace-no-wrap">
       <thead>
         <tr>
           <th className="text-left p-2">電話番号</th>
           <th className="text-left p-2">キャリア</th>
           <th className="text-left p-2">種別</th>
           <th className="text-left p-2">利用者氏名</th>
           <th className="text-left p-2">型番</th>
           <th className="text-left p-2">機種名</th>
           <th className="text-left p-2">手続名</th>
           <th className="text-left p-2">新規購入日</th>
           <th className="text-left p-2">機種変更日</th>
           <th className="text-left p-2">購入方法</th>
           <th className="text-left p-2">購入金額</th>
           <th className="text-left p-2">初回機種代金</th>
           <th className="text-left p-2">月額機種代金</th>
           <th className="text-left p-2">シェアパック加入</th>
           <th className="text-left p-2">契約開始日</th>
           <th className="text-left p-2">契約終了日</th>
           <th className="text-left p-2">手続依頼日</th>
           <th className="text-left p-2">手続完了日</th>
           <th className="text-left p-2">備考</th>
           <th className="text-left p-2">担当者</th>
           <th className="text-left p-2">月額</th>
         </tr>
       </thead>
       <tbody className="divide-y">
         {tbody}
       </tbody>
     </table>
   </Layout>
 )
}

export default PhoneWifis
