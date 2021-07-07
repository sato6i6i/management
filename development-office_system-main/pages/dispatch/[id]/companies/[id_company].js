import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../../../components/layout'
import DispatchNavigation from '../../../../components/dispatch-navigation'
import { useDispatch, useCompany } from '../../../../lib/hooks'

const Company = () => {
  const router = useRouter()
  const d = useDispatch(router.query.id)
  const c = useCompany({id: router.query.id_Company})
  const [dispatch, setDispatch] = useState()
  const [company, setCompany] = useState()
  const [submittable, setSubmittable] = useState(false)
  const [deletable, setDeletable] = useState(false)


  useEffect(() => {
    setDispatch(Array.isArray(d.dispatch) ? d.dispatch[0] : '')
  }, [d.isLoading])

  useEffect(() => {
    setCompany(Array.isArray(c.companies) ? c.companies[0] : '')
  }, [c.isLoading])

  useEffect(() => {
    setDeletable(!(router.query.id_company == 'new'))
  }, [router.query.id_company])

  if (!company) {
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmittable(false)
    const method = !company.id ? 'POST' : 'PUT'
    const res = await fetch(`/api/companies/${router.query.id_company}`, {method: method, body:JSON.stringify(company)});
    !company.id && router.push(`/dispatch/${router.query.id}/companies`)
  }

  function handleChange(e) {
    e.preventDefault()
    setSubmittable(true)
    const target = e.target
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name
    setCompany({ ...company, [name]: value, dispatchedStaffId: dispatch.dispatchedStaffId })
  }

  async function handleDelete(e) {
    e.preventDefault()
    if (confirm('削除します')) {
      const res = await fetch(`/api/companies/${router.query.id_company}`, {method: 'DELETE', body:JSON.stringify(company)});
      router.push(`/dispatch/${router.query.id}/companies`)
    }
  }

  return (
    <Layout>
      <DispatchNavigation dispatchedStaffId={dispatch.dispatchedStaffId} page="companies" />

      <div className="flex items-center mb-2">
        <div className="w-1/3">
          <label className="form-inline-label">カンパニー番号</label>
        </div>
        <div className="w-2/3">
          <div className="bg-gray-200 appearance-none border-2 border-gray-200 w-full py-2 px-4 text-gray-700 leading-tight">
            {dispatch.dispatchedStaffId}
          </div>
        </div>
      </div>

      <div className="flex items-center mb-8">
        <div className="w-1/3">
          <label className="form-inline-label">氏名</label>
        </div>
        <div className="w-2/3">
          <div className="bg-gray-200 appearance-none border-2 border-gray-200 w-full py-2 px-4 text-gray-700 leading-tight">
            {dispatch.username}
          </div>
        </div>
      </div>

      <div className="detail">
        <form onSubmit={handleSubmit}>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="companyName" className="form-inline-label">会社名</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="companyName" value={company.companyName || ''} onChange={handleChange} required
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="companyOverview" className="form-inline-label">会社概要</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="companyOverview" value={company.companyOverview || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="businessType" className="form-inline-label">業務種類</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="businessType" value={company.businessType || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="postalCode" className="form-inline-label">郵便番号</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="postalCode" value={company.postalCode || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="address" className="form-inline-label">住所</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="address" value={company.address || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="phoneNumber" className="form-inline-label">連絡先</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="phoneNumber" value={company.phoneNumber || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="mailAddress" className="form-inline-label">メールアドレス</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="mailAddress" value={company.mailAddress || ''} onChange={handleChange}
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

export default Company
