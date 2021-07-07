import { getSession } from '../../../lib/iron'
import DisasterStockpiles from '../../../models/disaster-stockpile'
import Staff from '../../../models/staff'


export default async function handler(req, res) {
  const session = await getSession(req)
  const disasterStockpiles = !session ? null : await DisasterStockpiles.findAll({
    order: [['id','ASC']],
    include:Staff

  })

  res.status(200).json({ disaster_stockpile: disasterStockpiles || null })
}
