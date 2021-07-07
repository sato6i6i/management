import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../../../components/layout'
import DispatchNavigation from '../../../../components/dispatch-navigation'
import { useDispatch, useOwnedQualification } from '../../../../lib/hooks'

const Qualification = () => {
  const router = useRouter()
  const d = useDispatch(router.query.id)
  const q = useOwnedQualification({id: router.query.id_qualification})
  const [dispatch, setDispatch] = useState()
  const [qualification, setQualification] = useState()
  const [submittable, setSubmittable] = useState(false)
  const [deletable, setDeletable] = useState(false)

  useEffect(() => {
    setDispatch(Array.isArray(d.dispatch) ? d.dispatch[0] : '')
  }, [d.isLoading])

  useEffect(() => {
    setQualification(Array.isArray(q.qualifications) ? q.qualifications[0] : '')
  }, [q.isLoading])

  useEffect(() => {
    setDeletable(!(router.query.id_qualification == 'new'))
  }, [router.query.id_qualification])

  if (!qualification) {
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmittable(false)
    const method = !qualification.id ? 'POST' : 'PUT'
    const res = await fetch(`/api/owned_qualification/${router.query.id_qualification}`, {method: method, body:JSON.stringify(qualification)});
    !qualification.id && router.push(`/dispatch/${router.query.id}/qualifications`)
  }

  function handleChange(e) {
    e.preventDefault()
    setSubmittable(true)
    const target = e.target
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name
    setQualification({ ...qualification, [name]: value, dispatchedStaffId: dispatch.id })
  }

  async function handleDelete(e) {
    e.preventDefault()
    if (confirm('削除します')) {
      const res = await fetch(`/api/owned_qualification/${router.query.id_qualification}`, {method: 'DELETE', body:JSON.stringify(qualification)});
      router.push(`/dispatch/${router.query.id}/qualifications`)
    }
  }

  return (
    <Layout>
      <DispatchNavigation id={dispatch.id} page="qualifications" />

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
              <label htmlFor="qualification" className="form-inline-label">資格名</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="qualification" value={qualification.qualification || ''} onChange={handleChange} required
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

export default Qualification
