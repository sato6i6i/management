import { getSession } from '../../../lib/iron'
import OwnedQualification from '../../../models/Owned_qualification'

export default async function handler(req, res) {
  const session = await getSession(req)
  const ownedQualifications = !session ? null : await OwnedQualification.findAll({
    where: req.query.dispatchedStaffId ? {dispatchedStaffId: req.query.dispatchedStaffId} : {},
    order: [['id', 'ASC']]
  })

  res.status(200).json({ qualifications: ownedQualifications || null })
}
