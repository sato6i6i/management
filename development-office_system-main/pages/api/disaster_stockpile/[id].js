import { getSession } from '../../../lib/iron'
import DisasterStockpiles from '../../../models/disaster-stockpile'
import Staff from '../../../models/staff'

export default async function staffHandler(req, res) {
  const session = await getSession(req)
  console.log(req.query.id)

  switch (req.method) {
    case 'GET':
      if (!session) {
        res.status(200).json({disaster_stockpile: null})
        break
      }
      const disasterstockpiles =
        req.query.id == 'new' ? [DisasterStockpiles.build()] : await DisasterStockpiles.findAll({where: {id: req.query.id}});
      const staff = !session ? null : await Staff.findAll({
          attributes: ['staffId','fullName'],
          order: [['staffId','ASC']]
      })
      res.status(200).json({disaster_stockpile: disasterstockpiles,staff:staff || null})
      break

    case 'POST':
      const post = JSON.parse(req.body)
      console.log(post)
      await DisasterStockpiles.create(post);
      res.status(200).json({})
      break

    case 'PUT':
      const put = JSON.parse(req.body)
      await DisasterStockpiles.update(put, {where: {id: put.id}});
      res.status(200).json({})
      break

    case 'DELETE':
      const destroy = JSON.parse(req.body)
      await DisasterStockpiles.destroy({where: {id: destroy.id}});
      res.status(200).json({})
      break

    default:
  }
}
