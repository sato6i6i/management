import { getSession } from '../../../lib/iron'
import ConstructionMaterials from '../../../models/construction-materials'
import Staff from '../../../models/staff'

export default async function handler(req, res) {
  const session = await getSession(req)
  const cmaterials = !session ? null : await ConstructionMaterials.findAll({
    order: [['id','ASC']],
    include:Staff
  })

  res.status(200).json({ construction_materials: cmaterials || null })
}
