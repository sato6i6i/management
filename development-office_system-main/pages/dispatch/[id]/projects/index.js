import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../../../components/layout'
import DispatchNavigation from '../../../../components/dispatch-navigation'
import { useDispatch, useDispatchProject } from '../../../../lib/hooks'

const DispatchProjects = () => {
  const router = useRouter()
  const d = useDispatch(router.query.id)
  const [dispatch, setDispatch] = useState()
  useEffect(() => {
    setDispatch(Array.isArray(d.dispatch) ? d.dispatch[0] : '')
  }, [d.isLoading])
  const dispatchProjects = useDispatchProject(dispatch && {dispatchedStaffId: dispatch.id} || '')

  if (!dispatch) {
    return null
  }

  const tbody = !dispatchProjects.dispatchProjects ? null : dispatchProjects.dispatchProjects.map(project =>
    <Link href="/dispatch/[id]/projects/[id_project]"
          as={`/dispatch/${dispatch.id}/projects/${project.id}`} key={project.id}>
      <tr className="hover:bg-gray-200">
        <td className="p-2">{project.projectName}</td>
      </tr>
    </Link>
  )

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

      <Link href="/dispatch/[id]/projects/[id_project]" as={`/dispatch/${dispatch.id}/projects/new`}>
        <div className="mb-4 flex justify-end">
          <button type="link" className="btn">新規作成</button>
        </div>
      </Link>

      <table className="container table-fixed">
        <thead>
          <tr>
            <th className="text-left p-2 w-1/4">プロジェクト名</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {tbody}
        </tbody>
      </table>
    </Layout>
  )
}

export default DispatchProjects
