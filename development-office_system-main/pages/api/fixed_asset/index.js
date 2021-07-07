import { getSession } from '../../../lib/iron'
import FixedAssets from '../../../models/fixed-asset'
import Staff from '../../../models/staff'


export default async function handler(req, res) {
  const session = await getSession(req)
  const assets = !session ? null : await FixedAssets.findAll({
    order: [['id','ASC']],
    include:[
    {
      model:Staff,
      as:"StaffId"
    }]
  })

  res.status(200).json({ fixed_asset: assets || null })
}
