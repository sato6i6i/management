import { getSession } from '../../../lib/iron'
import Dispatch from '../../../models/Dispatched_staff'

export default async function handler(req, res) {
  const session = await getSession(req)
  const dispatch = !session ? null : await Dispatch.findAll({
    attributes: ['id', 'companyNumber', 'username', 'furigana'],
    order: [['companyNumber', 'ASC']]
  })

  res.status(200).json({ dispatch: dispatch || null })
}
