import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../../components/layout'
import ObjectNavigation from '../../../components/object-navigation'
import { useCMaterial,useStaff } from '../../../lib/hooks'

const CMaterial = () => {
  const router = useRouter();
  const staff = useStaff()
  const c = useCMaterial(router.query.id_construction_materials)
  const [cMaterial, setCMaterial] = useState()
  const [submittable, setSubmittable] = useState(false)
  const [deletable, setDeletable] = useState(false)

  useEffect(() => {
    setCMaterial(Array.isArray(c.construction_materials) ? c.construction_materials[0] : '')
  },[c.isLoading])

  useEffect(() => {
    setDeletable(!(router.query.id_construction_materials == 'new'))
  },[router.query.id_construction_materials])

  if (!cMaterial) {
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmittable(false)
    const method= !cMaterial.id ? 'POST' : 'PUT'
    const res = await fetch(`/api/construction_materials/${router.query.id_construction_materials}`,{method: method, body:JSON.stringify(cMaterial)});
    !cMaterial.id && router.push(`/object/construction_materials`)
  }

  function handleChange(e){
    e.preventDefault()
    setSubmittable(true)
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name
    setCMaterial({...cMaterial,[name]:value})
  }

  async function handleDelete(e){
    e.preventDefault()
    if (confirm('削除します')){
      const res = await fetch(`/api/construction_materials/${router.query.id_construction_materials}`, {method: 'DELETE', body:JSON.stringify(cMaterial)});
      router.push(`/object/construction_materials`)
    }
  }

  const sbody = !staff.staff ? null : staff.staff.map(s =>
    <option value={s.staffId}>{s.fullName}</option>
  )


  return (
    <Layout>
      <ObjectNavigation page="construction_materials" />

      <div className="detail">
        <form onSubmit={handleSubmit}>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="orderDate" className="form-inline-label">注文日</label>
            </div>
            <div className="w-2/3">
              <input type="date" name="orderDate" value={cMaterial.orderDate || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="orderDistination" className="form-inline-label">注文先</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="orderDistination" value={cMaterial.orderDistination || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="productName" className="form-inline-label">品名（必須）</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="productName" value={cMaterial.productName || ''} onChange={handleChange} required
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="productType" className="form-inline-label">種類</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="productType" value={cMaterial.productType || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="credit" className="form-inline-label">単位</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="credit" value={cMaterial.credit || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="quantity" className="form-inline-label">数量</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="quantity" value={cMaterial.quantity || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="unitPrice" className="form-inline-label">単価</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="unitPrice" value={cMaterial.unitPrice || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="price" className="form-inline-label">金額</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="price" value={cMaterial.price || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="wbs" className="form-inline-label">WBS</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="wbs" value={cMaterial.wbs || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="constructionForShort" className="form-inline-label">工事略称</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="constructionForShort" value={cMaterial.constructionForShort || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="deliveryDate" className="form-inline-label">納品日</label>
            </div>
            <div className="w-2/3">
              <input type="date" name="deliveryDate" value={cMaterial.deliveryDate || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="payoutDate" className="form-inline-label">払い出し日</label>
            </div>
            <div className="w-2/3">
              <input type="date" name="payoutDate" value={cMaterial.payoutDate || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="staffId" className="form-inline-label">担当者（必須）</label>
            </div>
            <div className="w-2/3">
              <select name="staffId" value={cMaterial.staffId || ''} onChange={handleChange} required
              className="form-inline-input">
                <option value=""></option>
                {sbody}
              </select>
              <input type="hidden" />
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="inventoryDate" className="form-inline-label">棚卸日</label>
            </div>
            <div className="w-2/3">
              <input type="date" name="inventoryDate" value={cMaterial.inventoryDate || ''} onChange={handleChange}
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

export default CMaterial
