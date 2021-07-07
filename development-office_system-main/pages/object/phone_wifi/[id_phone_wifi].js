import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../../components/layout'
import ObjectNavigation from '../../../components/object-navigation'
import { usePhone,useStaff } from '../../../lib/hooks'

const PhoneWifi = () => {
  const router = useRouter();
  const staff = useStaff()
  const ph = usePhone(router.query.id_phone_wifi)
  const [phoneWifi, setPhone] = useState()
  const [submittable, setSubmittable] = useState(false)
  const [deletable, setDeletable] = useState(false)

  useEffect(() => {
    setPhone(Array.isArray(ph.phone_wifi) ? ph.phone_wifi[0] : '')
  },[ph.isLoading])

  useEffect(() => {
    setDeletable(!(router.query.id_phone_wifi == 'new'))
  },[router.query.id_phone_wifi])

  if (!phoneWifi) {
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmittable(false)
    const method= !phoneWifi.id ? 'POST' : 'PUT'
    const res = await fetch(`/api/phone_wifi/${router.query.id_phone_wifi}`,{method: method, body:JSON.stringify(phoneWifi)});
    !phoneWifi.id && router.push(`/object/phone_wifi`)
  }

  function handleChange(e){
    e.preventDefault()
    setSubmittable(true)
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name
    setPhone({...phoneWifi,[name]:value})
  }

  async function handleDelete(e){
    e.preventDefault()
    if (confirm('削除します')){
      const res = await fetch(`/api/phone_wifi/${router.query.id_phone_wifi}`, {method: 'DELETE', body:JSON.stringify(phoneWifi)});
      router.push(`/object/phone_wifi`)
    }
  }

  const sbody = !staff.staff ? null : staff.staff.map(s =>
    <option value={s.staffId}>{s.fullName}</option>
  )


  return (
    <Layout>
      <ObjectNavigation page="phone_wifi" />

      <div className="detail">
        <form onSubmit={handleSubmit}>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="telephoneNumber" className="form-inline-label">電話番号（必須）</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="telephoneNumber" value={phoneWifi.telephoneNumber || ''} onChange={handleChange} required
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="carrier" className="form-inline-label">キャリア</label>
            </div>
            <div className="w-2/3">
              <select  name="carrier" value={phoneWifi.carrier || ''} onChange={handleChange} className="form-inline-input">
                <option value=""></option>
                <option value="ドコモ">ドコモ</option>
                <option value="Softbank">Softbank</option>
                <option value="KDDI">KDDI</option>
                <option value="楽天モバイル">楽天モバイル</option>
                <option value="その他">その他</option>
              </select>
              <input type="hidden" />
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="typeTelWifi" className="form-inline-label">種別</label>
            </div>
            <div className="w-2/3">
              <select  name="typeTelWifi" value={phoneWifi.typeTelWifi || ''} onChange={handleChange} className="form-inline-input">
              　<option value=""></option>
                <option value="携帯">携帯</option>
                <option value="Wi-Fi">Wi-Fi</option>
              </select>
              <input type="hidden" />
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="userName" className="form-inline-label">利用者氏名（必須）</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="userName" value={phoneWifi.userName || ''} onChange={handleChange} required
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="modelNumber" className="form-inline-label">型番</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="modelNumber" value={phoneWifi.modelNumber || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="modelName" className="form-inline-label">機種名</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="modelName" value={phoneWifi.modelName || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="processName" className="form-inline-label">手続き名</label>
            </div>
            <div className="w-2/3">
              <select name="processName" value={phoneWifi.processName || ''} onChange={handleChange}
              className="form-inline-input">
                <option value=""></option>
                <option value="購入">購入</option>
                <option value="機種変更">機種変更</option>
                <option value="名義変更">名義変更</option>
                <option value="請求先変更">請求先変更</option>
              </select>
              <input type="hidden" />
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="newBuyDate" className="form-inline-label">新規購入日</label>
            </div>
            <div className="w-2/3">
              <input type="date" name="newBuyDate" value={phoneWifi.newBuyDate || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="modelChangeDate" className="form-inline-label">機種変更日</label>
            </div>
            <div className="w-2/3">
              <input type="date" name="modelChangeDate" value={phoneWifi.modelChangeDate || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="buyMethod" className="form-inline-label">購入方法</label>
            </div>
            <div className="w-2/3">
              <select name="buyMethod" value={phoneWifi.buyMethod || ''} onChange={handleChange}
              className="form-inline-input">
              　<option value=""></option>
                <option value="一括">一括</option>
                <option value="分割">分割</option>
              </select>
              <input type="hidden" />
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="buyPrice" className="form-inline-label">購入金額</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="buyPrice" value={phoneWifi.buyPrice || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="firstTimeModelPrice" className="form-inline-label">初回機種代金</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="firstTimeModelPrice" value={phoneWifi.firstTimeModelPrice || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="modelMonthly" className="form-inline-label">月額機種代金</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="modelMonthly" value={phoneWifi.modelMonthly || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="sharepackEntry" className="form-inline-label">シェアパック加入</label>
            </div>
            <div className="w-2/3">
              <select name="sharepackEntry" value={phoneWifi.sharepackEntry || ''} onChange={handleChange}
              className="form-inline-input">
              　<option value=""></option>
                <option value="あり">あり</option>
                <option value="なし">なし</option>
              </select>
              <input type="hidden" />
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="contractStart" className="form-inline-label">契約開始日</label>
            </div>
            <div className="w-2/3">
              <input type="date" name="contractStart" value={phoneWifi.contractStart || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="contractEnd" className="form-inline-label">契約終了日</label>
            </div>
            <div className="w-2/3">
              <input type="date" name="contractEnd" value={phoneWifi.contractEnd || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="processReqDate" className="form-inline-label">手続依頼日</label>
            </div>
            <div className="w-2/3">
              <input type="date" name="processReqDate" value={phoneWifi.processReqDate || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="processCompDate" className="form-inline-label">手続完了日</label>
            </div>
            <div className="w-2/3">
              <input type="date" name="processCompDate" value={phoneWifi.processCompDate || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="note" className="form-inline-label">備考</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="note" value={phoneWifi.note || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="staffId" className="form-inline-label">担当者（必須）</label>
            </div>
            <div className="w-2/3">
              <select name="staffId" value={phoneWifi.staffId || ''} onChange={handleChange} required
              className="form-inline-input">
                <option value=""></option>
                {sbody}
              </select>
            <input type = "hidden" />
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="monthly" className="form-inline-label">月額</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="monthly" value={phoneWifi.monthly || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>




          <div className="flex items-center mb-2">
            <div className="w-1/3"></div>
            <div className="w-1/3">
              <button type="submit" disabled={!submittable}
                      className={submittable ? "btn px-8" : "btn-disabled px-8"}>更新</button>
            </div>
            <div className="w-1/3 flex justify-end">
              <button type="submit" disabled={!deletable} onClick={handleDelete}
                      className={deletable ? "btn px-8" : "btn-disabled px-8"}>削除</button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default PhoneWifi
