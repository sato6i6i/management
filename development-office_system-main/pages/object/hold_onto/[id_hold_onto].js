import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../../components/layout'
import ObjectNavigation from '../../../components/object-navigation'
import { useHoldOnto,useStaff } from '../../../lib/hooks'

const HoldOnto = () => {
  const router = useRouter();
  const staff = useStaff()
  const h = useHoldOnto(router.query.id_hold_onto)
  const [holdOnto, setHoldOnto] = useState()
  const [submittable, setSubmittable] = useState(false)
  const [deletable, setDeletable] = useState(false)


  useEffect(() => {
    setHoldOnto(Array.isArray(h.hold_onto) ? h.hold_onto[0] : '')
  },[h.isLoading])

  useEffect(() => {
    setDeletable(!(router.query.id_hold_onto == 'new'))
  }, [router.query.id_hold_onto])

  if (!holdOnto) {
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmittable(false)
    const method = !holdOnto.id  ? 'POST' : 'PUT'
    const res = await fetch(`/api/hold_onto/${router.query.id_hold_onto}`, {method: method, body:JSON.stringify(holdOnto)});
    !holdOnto.id && router.push(`/object/hold_onto`)
  }

  function handleChange(e){
    e.preventDefault()
    setSubmittable(true)
    const target = e.target;
    const value = target.value
    const name = target.name
    setHoldOnto({...holdOnto, [name]:value})
  }

  async function handleDelete(e) {
    e.preventDefault()
    if (confirm('削除します')) {
      const res = await fetch(`/api/hold_onto/${router.query.id_hold_onto}`, {method: 'DELETE', body:JSON.stringify(holdOnto)});
      router.push(`/object/hold_onto`)
    }
  }

  const sbody = !staff.staff ? null : staff.staff.map(s =>
    <option value={s.staffId}>{s.fullName}</option>
  )

  return (
    <Layout>
      <ObjectNavigation page="hold_onto" />

      <div className="detail">
        <form onSubmit={handleSubmit}>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="productName" className="form-inline-label">品名（必須）</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="productName" value={holdOnto.productName || ''} onChange={handleChange} required
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="serialCode" className="form-inline-label">シリアル</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="serialCode" value={holdOnto.serialCode || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="customerStaff" className="form-inline-label">お客様担当者（必須）</label>
            </div>
            <div className="w-2/3">
              <select value={holdOnto.customerStaff || ''} onChange={handleChange} name="customerStaff" className="form-inline-input" required>
                <option value=""></option>
                {sbody}
              </select>
              <input type = "hidden" />
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="getDate" className="form-inline-label">受入日</label>
            </div>
            <div className="w-2/3">
              <input type="date" name="getDate" value={holdOnto.getDate || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="getStaff" className="form-inline-label">受領者（必須）</label>
            </div>
            <div className="w-2/3">
              <select name="getStaff" value={holdOnto.getStaff || ''} onChange={handleChange} required
              className="form-inline-input">
                <option value=""></option>
                {sbody}
              </select>
              <input type = "hidden" />
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="storagePeriod" className="form-inline-label">保管期限</label>
            </div>
            <div className="w-2/3">
              <input type="date" name="storagePeriod" value={holdOnto.storagePeriod || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="storagePlace" className="form-inline-label">保管場所</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="storagePlace" value={holdOnto.storagePlace || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="payoutDate" className="form-inline-label">払い出し日</label>
            </div>
            <div className="w-2/3">
              <input type="date" name="payoutDate" value={holdOnto.payoutDate || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="payoutStaff" className="form-inline-label">払い出し者</label>
            </div>
            <div className="w-2/3">
              <select name="payoutStaff" value={holdOnto.payoutStaff || ''} onChange={handleChange}
              className="form-inline-input">
                <option value=""></option>
                {sbody}
              </select>
              <input type = "hidden" />
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="projectTitle" className="form-inline-label">案件名</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="projectTitle" value={holdOnto.projectTitle || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="status" className="form-inline-label">ステータス</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="status" value={holdOnto.status || ''} onChange={handleChange}
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

export default HoldOnto
