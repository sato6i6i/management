import { getSession } from '../../../lib/iron'
import FixedAssets from '../../../models/fixed-asset'
import Staff from '../../../models/staff'

export default async function staffHandler(req, res) {
  const session = await getSession(req)
  console.log(req.query.id)

  switch (req.method) {
    case 'GET':
      if (!session) {
        res.status(200).json({fixed_asset: null})
        break
      }
      const assets =
        req.query.id == 'new' ? [FixedAssets.build()] : await FixedAssets.findAll({where: {id: req.query.id}});
      const staff = !session ? null : await Staff.findAll({
            attributes: ['staffId','fullName'],
            order: [['staffId','ASC']]
      })
      res.status(200).json({fixed_asset: assets,staff:staff || null})
      break

    case 'POST':
      const post = JSON.parse(req.body)
      console.log(post)
      await FixedAssets.create(post);
      res.status(200).json({})
      break

    case 'PUT':
      const put = JSON.parse(req.body)
      await FixedAssets.update(put, {where: {id: put.id}});
      res.status(200).json({})
      break

    case 'DELETE':
      const destroy = JSON.parse(req.body)
      await FixedAssets.destroy({where: {id: destroy.id}});
      res.status(200).json({})
      break

    default:
  }
}
