import { getSession } from '../../../lib/iron'
import HoldOnto from '../../../models/hold-onto'
import Staff from '../../../models/staff'

export default async function staffHandler(req, res) {
  const session = await getSession(req)
  console.log(req.query.id)

  switch (req.method) {
    case 'GET':
      if (!session) {
        res.status(200).json({hold_onto: null})
        break
      }
      const holdontos =
        req.query.id == 'new' ? [HoldOnto.build()] : await HoldOnto.findAll({where: {id: req.query.id}});
      const staff = !session ? null : await Staff.findAll({
        attributes: ['staffId','fullName'],
        order: [['staffId','ASC']]
      })
      res.status(200).json({hold_onto: holdontos,staff: staff || null})
      break

    case 'POST':
      const post = JSON.parse(req.body)
      console.log(post)
      await HoldOnto.create(post);
      res.status(200).json({})
      break

    case 'PUT':
      const put = JSON.parse(req.body)
      await HoldOnto.update(put, {where: {id: put.id}});
      res.status(200).json({})
      break

    case 'DELETE':
      const destroy = JSON.parse(req.body)
      await HoldOnto.destroy({where: {id: destroy.id}});
      res.status(200).json({})
      break

    default:
  }
}
