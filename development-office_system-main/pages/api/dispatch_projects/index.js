import { getSession } from '../../../lib/iron'
import DispatchProject from '../../../models/Dispatch_project'

export default async function handler(req, res) {
  const session = await getSession(req)
  const DispatchProjects = !session ? null : await DispatchProject.findAll({
    where: req.query.dispatchedStaffId ? {dispatchedStaffId: req.query.dispatchedStaffId} : {},
    order: [['id', 'ASC']]
  })

  res.status(200).json({ DispatchProjects: DispatchProjects || null })
}
