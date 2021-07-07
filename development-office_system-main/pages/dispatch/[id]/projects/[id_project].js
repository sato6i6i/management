import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../../../components/layout'
import DispatchNavigation from '../../../../components/dispatch-navigation'
import { useDispatch, useDispatchProject } from '../../../../lib/hooks'

const Project = () => {
  const router = useRouter()
  const d = useDispatch(router.query.id)
  const p = useDispatchProject({id: router.query.id_project})
  const [dispatch, setDispatch] = useState()
  const [project, setProject] = useState()
  const [submittable, setSubmittable] = useState(false)
  const [deletable, setDeletable] = useState(false)

  useEffect(() => {
    setDispatch(Array.isArray(d.dispatch) ? d.dispatch[0] : '')
  }, [d.isLoading])

  useEffect(() => {
    setProject(Array.isArray(p.projects) ? p.projects[0] : '')
  }, [p.isLoading])

  useEffect(() => {
    setDeletable(!(router.query.id_project == 'new'))
  }, [router.query.id_project])

  if (!project) {
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmittable(false)
    const method = !project.id ? 'POST' : 'PUT'
    const res = await fetch(`/api/projects/${router.query.id_project}`, {method: method, body:JSON.stringify(project)});
    !project.id && router.push(`/dispatch/${router.query.id}/projects`)
  }

  function handleChange(e) {
    e.preventDefault()
    setSubmittable(true)
    const target = e.target
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name
    setProject({ ...project, [name]: value, dispatchedStaffId: dispatch.id })
  }

  async function handleDelete(e) {
    e.preventDefault()
    if (confirm('削除します')) {
      const res = await fetch(`/api/projects/${router.query.id_project}`, {method: 'DELETE', body:JSON.stringify(project)});
      router.push(`/staff/${router.query.id}/projects`)
    }
  }

  return (
    <Layout>
      <DispatchNavigation id={dispatch.id} page="projects" />

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
              <label htmlFor="projectName" className="form-inline-label">プロジェクト名</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="projectName" value={project.projectName || ''} onChange={handleChange} required
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

export default Project
