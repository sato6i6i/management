import { getSession } from '../../../lib/iron'
import Dispatch from '../../../models/dispatched_staff'
//import Staff from '../../../models/staff'

export default async function staffHandler(req, res) {
  const session = await getSession(req)
  console.log(req.query.id)

  switch (req.method) {
    case 'GET':
      if (!session) {
        res.status(200).json({dispatch: null })
        break
      }
      const dispatch = req.query.id == 'new' ? [Dispatch.build()] : await Dispatch.findAll({where: {id: req.query.id}})
      res.status(200).json({dispatch: dispatch})
      break

    case 'POST':
      const post = JSON.parse(req.body)
      await Dispatch.create(post);
      res.status(200).json({})
      break

    case 'PUT':
      const put = JSON.parse(req.body)
      await Dispatch.update(put, {where: {id: put.id}});
      res.status(200).json({})
      break

    case 'DELETE':
      const destroy = JSON.parse(req.body)
      await Dispatch.destroy({where: {id: destroy.id}});
      res.status(200).json({})
      break

    default:
  }
}
