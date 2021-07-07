import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../../components/layout'
import ObjectNavigation from '../../../components/object-navigation'
import { useDisasterStockpile,useStaff } from '../../../lib/hooks'

const DisasterStockpile = () => {
  const router = useRouter();
  const staff = useStaff()
  const d = useDisasterStockpile(router.query.id_disaster_stockpile)
  const [disasterStockpile, setDisasterStockpile] = useState()
  const [submittable, setSubmittable] = useState(false)
  const [deletable, setDeletable] = useState(false)

  useEffect(() => {
    setDisasterStockpile(Array.isArray(d.disaster_stockpile) ? d.disaster_stockpile[0] : '')
  },[d.isLoading])

  useEffect(() => {
    setDeletable(!(router.query.id_disaster_stockpile == 'new'))
  },[router.query.id_disaster_stockpile])

  if (!disasterStockpile) {
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmittable(false)
    const method= !disasterStockpile.id ? 'POST' : 'PUT'
    const res = await fetch(`/api/disaster_stockpile/${router.query.id_disaster_stockpile}`,{method: method, body:JSON.stringify(disasterStockpile)});
    !disasterStockpile.id && router.push(`/object/disaster_stockpile`)
  }

  function handleChange(e){
    e.preventDefault()
    setSubmittable(true)
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name
    setDisasterStockpile({...disasterStockpile,[name]:value})
  }

  async function handleDelete(e){
    e.preventDefault()
    if (confirm('削除します')){
      const res = await fetch(`/api/disaster_stockpile/${router.query.id_disaster_stockpile}`, {method: 'DELETE', body:JSON.stringify(disasterStockpile)});
      router.push(`/object/disaster_stockpile`)
    }
  }

  const sbody = !staff.staff ? null : staff.staff.map(s =>
    <option value={s.staffId}>{s.fullName}</option>
  )


  return (
    <Layout>
      <ObjectNavigation page="disaster_stockpile" />

      <div className="detail">
        <form onSubmit={handleSubmit}>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="comfirmDate" className="form-inline-label">確認日</label>
            </div>
            <div className="w-2/3">
              <input type="date" name="comfirmDate" value={disasterStockpile.comfirmDate || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="productName" className="form-inline-label">品名（必須）</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="productName" value={disasterStockpile.productName || ''} onChange={handleChange} required
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="buyQuantity" className="form-inline-label">購入数</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="buyQuantity" value={disasterStockpile.buyQuantity || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="boxes" className="form-inline-label">箱数</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="boxes" value={disasterStockpile.boxes || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="stock" className="form-inline-label">在庫数</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="stock" value={disasterStockpile.stock || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="retailer" className="form-inline-label">購入先</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="retailer" value={disasterStockpile.retailer || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="buyPrice" className="form-inline-label">購入金額（税込）</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="buyPrice" value={disasterStockpile.buyPrice || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="storagePeriod" className="form-inline-label">保管期限</label>
            </div>
            <div className="w-2/3">
              <input type="date" name="storagePeriod" value={disasterStockpile.storagePeriod || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="status" className="form-inline-label">ステータス</label>
            </div>
            <div className="w-2/3">
              <select name="status" value={disasterStockpile.status || ''} onChange={handleChange}
              className="form-inline-input">
                <option value=""></option>
                <option value="購入">購入</option>
                <option value="配布済">配布済</option>
                <option value="使用済">使用済</option>
                <option value="保管中">保管中</option>
                <option value="期限切れ">期限切れ</option>
                <option value="廃棄">廃棄</option>
                <option value="寄贈">寄贈</option>
              </select>
              <input type="hidden" />
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="storagePlace" className="form-inline-label">保管場所</label>
            </div>
            <div className="w-2/3">
              <select name="storagePlace" value={disasterStockpile.storagePlace || ''} onChange={handleChange}
              className="form-inline-input">
              　<option value=""></option>
                <option value="EB">EB</option>
                <option value="3階倉庫">3F倉庫</option>
                <option value="3F裏ロッカー">3F裏ロッカー</option>
                <option value="3F事務所内">3F事務所内</option>
              </select>
              <input type="hidden" />
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="note1" className="form-inline-label">備考①</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="note1" value={disasterStockpile.note1 || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="note2" className="form-inline-label">備考②</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="note2" value={disasterStockpile.note2 || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="newApprovalDoc" className="form-inline-label">稟議書作成日</label>
            </div>
            <div className="w-2/3">
              <input type="date" name="newApprovalDoc" value={disasterStockpile.newApprovalDoc || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="staffId" className="form-inline-label">担当者（必須）</label>
            </div>
            <div className="w-2/3">
              <select name="staffId" value={disasterStockpile.staffId || ''} onChange={handleChange} required
              className="form-inline-input">
                <option value=""></option>
                {sbody}
              </select>
              <input type = "hidden" />
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

export default DisasterStockpile
