import { getSession } from '../../../lib/iron'
import DispatchingCompany from '../../../models/Dispatching_company'

export default async function staffHandler(req, res) {
  const session = await getSession(req)

  switch (req.method) {
    case 'GET':
      if (!session) {
        res.status(200).json({ companies: null })
        break
      }
      const companies =
        req.query.id == 'new' ? [DispatchingCompany.build()] : await DispatchingCompany.findAll({where: {id: req.query.id}})
      res.status(200).json({companies: companies})
      break

    case 'POST':
      const post = JSON.parse(req.body)
      console.log(post)
      await DispatchingCompany.create(post);
      res.status(200).json({})
      break

    case 'PUT':
      const put = JSON.parse(req.body)
      await DispatchingCompany.update(put, {where: {id: put.id}});
      res.status(200).json({})
      break

    case 'DELETE':
      const destroy = JSON.parse(req.body)
      await DispatchingCompany.destroy({where: {id: destroy.id}});
      res.status(200).json({})
      break

    default:
  }
}
