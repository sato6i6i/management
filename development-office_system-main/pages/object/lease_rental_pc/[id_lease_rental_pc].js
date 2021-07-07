import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../../components/layout'
import ObjectNavigation from '../../../components/object-navigation'
import { usePc,useStaff } from '../../../lib/hooks'

const Pc = () => {
  const router = useRouter();
  const staff = useStaff()
  const p = usePc(router.query.id_lease_rental_pc)
  const [pc, setPc] = useState()
  const [submittable, setSubmittable] = useState(false)
  const [deletable, setDeletable] = useState(false)

  useEffect(() => {
    setPc(Array.isArray(p.lease_rental_pc) ? p.lease_rental_pc[0] : '')
  },[p.isLoading])

  useEffect(() => {
    setDeletable(!(router.query.id_lease_rental_pc == 'new'))
  },[router.query.id_lease_rental_pc])

  if (!pc) {
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmittable(false)
    const method= !pc.id ? 'POST' : 'PUT'
    const res = await fetch(`/api/lease_rental_pc/${router.query.id_lease_rental_pc}`,{method: method, body:JSON.stringify(pc)});
    !pc.id && router.push(`/object/lease_rental_pc`)
  }

  function handleChange(e){
    e.preventDefault()
    setSubmittable(true)
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name
    setPc({...pc,[name]:value})
  }

  async function handleDelete(e){
    e.preventDefault()
    if (confirm('削除します')){
      const res = await fetch(`/api/lease_rental_pc/${router.query.id_lease_rental_pc}`, {method: 'DELETE', body:JSON.stringify(pc)});
      router.push(`/object/lease_rental_pc`)
    }
  }

  const sbody = !staff.staff ? null : staff.staff.map(s =>
    <option value={s.staffId}>{s.fullName}</option>
  )


  return (
    <Layout>
      <ObjectNavigation page="lease_rental_pc" />

      <div className="detail">
        <form onSubmit={handleSubmit}>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="contracTnumber" className="form-inline-label">契約番号（必須）</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="contracTnumber" value={pc.contracTnumber || ''} onChange={handleChange} required
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="productName" className="form-inline-label">品名</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="productName" value={pc.productName || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="os" className="form-inline-label">OS</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="os" value={pc.os || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="officeVer" className="form-inline-label">office Ver.</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="officeVer" value={pc.officeVer || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="pcName" className="form-inline-label">コンピューター名（必須）</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="pcName" value={pc.pcName || ''} onChange={handleChange} required
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="contractStart" className="form-inline-label">契約開始日</label>
            </div>
            <div className="w-2/3">
              <input type="date" name="contractStart" value={pc.contractStart || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="contractEnd" className="form-inline-label">契約終了日</label>
            </div>
            <div className="w-2/3">
              <input type="date" name="contractEnd" value={pc.contractEnd || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="userName" className="form-inline-label">使用者（必須）</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="userName" value={pc.userName || ''} onChange={handleChange} required
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="ipAddress" className="form-inline-label">IPアドレス</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="ipAddress" value={pc.ipAddress || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="vpn" className="form-inline-label">SSL-VPN</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="vpn" value={pc.vpn || ''} onChange={handleChange}
              className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="monthly" className="form-inline-label">月額</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="monthly" value={pc.monthly || ''} onChange={handleChange}
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

export default Pc
