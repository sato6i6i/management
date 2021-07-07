import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../../../components/layout'
import DispatchNavigation from '../../../../components/dispatch-navigation'
import { useDispatch, useContract } from '../../../../lib/hooks'

const Contract = () => {
  const router = useRouter()
  const d = useDispatch(router.query.id)
  const c = useContract({id: router.query.id_contract})
  const [dispatch, setDispatch] = useState()
  const [contract, setContract] = useState()
  const [submittable, setSubmittable] = useState(false)
  const [deletable, setDeletable] = useState(false)

  useEffect(() => {
    setDispatch(Array.isArray(d.dispatch) ? d.dispatch[0] : '')
  }, [d.isLoading])

  useEffect(() => {
    setContract(Array.isArray(c.contract) ? c.contract[0] : '')
  }, [c.isLoading])

  useEffect(() => {
    setDeletable(!(router.query.id_contract == 'new'))
  }, [router.query.id_contract])

  if (!contract) {
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmittable(false)
    const method = !contract.id ? 'POST' : 'PUT'
    const res = await fetch(`/api/contracts/${router.query.id_contract}`, {method: method, body:JSON.stringify(contract)});
    !contract.id && router.push(`/dispatch/${router.query.id}/contracts`)
  }

  function handleChange(e) {
    e.preventDefault()
    setSubmittable(true)
    const target = e.target
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name
    setContract({ ...contract, [name]: value, dispatchedStaffId: dispatch.dispatchedStaffId })
  }

  async function handleDelete(e) {
    e.preventDefault()
    if (confirm('削除します')) {
      const res = await fetch(`/api/contracts/${router.query.id_contract}`, {method: 'DELETE', body:JSON.stringify(contract)});
      router.push(`/dispatch/${router.query.id}/contracts`)
    }
  }

  return (
    <Layout>
      <DispatchNavigation id={dispatch.id} page="contracts" />

      <div className="flex items-center mb-2">
        <div className="w-1/3">
          <label className="form-inline-label">カンパニー番号</label>
        </div>
        <div className="w-2/3">
          <div className="bg-gray-200 appearance-none border-2 border-gray-200 w-full py-2 px-4 text-gray-700 leading-tight">
            {dispatch.companyNumber}
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
              <label htmlFor="joinDate" className="form-inline-label">入社年月日</label>
            </div>
            <div className="w-2/3">
              <input type="date" name="joinDate" value={contract.joinDate || ''} onChange={handleChange} required
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="retiredDate" className="form-inline-label">退職年月日</label>
            </div>
            <div className="w-2/3">
              <input type="date" name="retiredDate" value={contract.retiredDate || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="contractEndDate" className="form-inline-label">契約満了年月日</label>
            </div>
            <div className="w-2/3">
              <input type="date" name="contractEndDate" value={contract.contractEndDate || ''} onChange={handleChange}
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

export default Contract
