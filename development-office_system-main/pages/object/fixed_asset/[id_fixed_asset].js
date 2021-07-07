import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../../components/layout'
import ObjectNavigation from '../../../components/object-navigation'
import { useFixedAsset,useStaff } from '../../../lib/hooks'

const FixedAsset = () => {
  const router = useRouter();
  const staff = useStaff()
  const f = useFixedAsset(router.query.id_fixed_asset)
  const [fixedAsset, setFixedAsset] = useState()
  const [submittable, setSubmittable] = useState(false)
  const [deletable, setDeletable] = useState(false)

  useEffect(() => {
    setFixedAsset(Array.isArray(f.fixed_asset) ? f.fixed_asset[0] : '')
  },[f.isLoading])

  useEffect(() => {
    setDeletable(!(router.query.id_fixed_asset == 'new'))
  },[router.query.id_fixed_asset])

  if (!fixedAsset) {
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmittable(false)
    fixedAsset.userName = fixedAsset.userName === "" ? null : fixedAsset.userName
    const method= !fixedAsset.id ? 'POST' : 'PUT'
    const res = await fetch(`/api/fixed_asset/${router.query.id_fixed_asset}`,{method: method, body:JSON.stringify(fixedAsset)});
    !fixedAsset.id && router.push(`/object/fixed_asset`)
  }

  function handleChange(e){
    e.preventDefault()
    setSubmittable(true)
    const target = e.target;
    const value = target.value
    const name = target.name
    setFixedAsset({...fixedAsset,[name]:value})
  }

  async function handleDelete(e){
    e.preventDefault()
    if (confirm('削除します')){
      const res = await fetch(`/api/fixed_asset/${router.query.id_fixed_asset}`, {method: 'DELETE', body:JSON.stringify(fixedAsset)});
      router.push(`/object/fixed_asset`)
    }
  }

  const sbody = !staff.staff ? null : staff.staff.map(s =>
    <option value={s.staffId}>{s.fullName}</option>
  )


  return (
    <Layout>
      <ObjectNavigation page="fixed_asset" />

      <div className="detail">
        <form onSubmit={handleSubmit}>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="assetsCode" className="form-inline-label">資産コード（必須）</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="assetsCode" value={fixedAsset.assetsCode || ''} onChange={handleChange} required
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="assetsType" className="form-inline-label">種別</label>
            </div>
            <div className="w-2/3">
              <select name="assetsType" value={fixedAsset.assetsType || ''} onChange={handleChange}
              className="form-inline-input">
              　<option value=""></option>
                <option value="建物付属設備">建物付属設備</option>
                <option value="工具器具">工具器具</option>
                <option value="備品">工具器具</option>
                <option value="ソフトウェア">ソフトウェア</option>
              </select>
              <input type="hidden" />
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="assetsName" className="form-inline-label">資産名（必須）</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="assetsName" value={fixedAsset.assetsName || ''} onChange={handleChange} required
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="quantity" className="form-inline-label">数量</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="quantity" value={fixedAsset.quantity || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="getDate" className="form-inline-label">取得日付</label>
            </div>
            <div className="w-2/3">
              <input type="date" name="getDate" value={fixedAsset.getDate || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="commonDate" className="form-inline-label">供用日付</label>
            </div>
            <div className="w-2/3">
              <input type="date" name="commonDate" value={fixedAsset.commonDate || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="userName" className="form-inline-label">利用者氏名</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="userName" value={fixedAsset.userName || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="usePlace" className="form-inline-label">使用場所</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="usePlace" value={fixedAsset.usePlace || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="getPrice" className="form-inline-label">取得価格</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="getPrice" value={fixedAsset.getPrice || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="tax" className="form-inline-label">消費税</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="tax" value={fixedAsset.tax || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="taxRate" className="form-inline-label">消費税率</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="taxRate" value={fixedAsset.taxRate || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="remainPrice" className="form-inline-label">残存価格</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="remainPrice" value={fixedAsset.remainPrice || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="repaymentMethod" className="form-inline-label">償却方法</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="repaymentMethod" value={fixedAsset.repaymentMethod || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="serviceLife" className="form-inline-label">耐用年数</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="serviceLife" value={fixedAsset.serviceLife || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="currentTermRepayment" className="form-inline-label">当期償却額</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="currentTermRepayment" value={fixedAsset.currentTermRepayment || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="endOfTermBookValue" className="form-inline-label">期末帳簿価格</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="endOfTermBookValue" value={fixedAsset.endOfTermBookValue || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="repaymentWbscode" className="form-inline-label">償却WBSコード</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="repaymentWbscode" value={fixedAsset.repaymentWbscode || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>


          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="repaymentWbsname" className="form-inline-label">償却WBS名</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="repaymentWbsname" value={fixedAsset.repaymentWbsname || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="other" className="form-inline-label">その他</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="other" value={fixedAsset.other || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="inventoryDate" className="form-inline-label">棚卸年月日</label>
            </div>
            <div className="w-2/3">
              <input type="date" name="inventoryDate" value={fixedAsset.inventoryDate || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="staffId" className="form-inline-label">担当者（必須）</label>
            </div>
            <div className="w-2/3">
              <select type="text" name="staffId" value={fixedAsset.staffId || ''} onChange={handleChange} required
              className="form-inline-input">
                <option value=""></option>
                {sbody}
              </select>
              <input type = "hidden" />
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="note" className="form-inline-label">備考</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="note" value={fixedAsset.note || ''} onChange={handleChange}
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

export default FixedAsset
