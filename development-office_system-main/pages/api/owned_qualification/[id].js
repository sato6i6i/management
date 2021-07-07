import { getSession } from '../../../lib/iron'
import OwnedQualifications from '../../../models/Owned_qualification'

export default async function staffHandler(req, res) {
  const session = await getSession(req)

  switch (req.method) {
    case 'GET':
      if (!session) {
        res.status(200).json({ qualifications: null })
        break
      }
      const qualifications =
        req.query.id == 'new' ? [OwnedQualifications.build()] : await OwnedQualifications.findAll({where: {id: req.query.id}})
      res.status(200).json({qualifications: qualifications})
      break

    case 'POST':
      const post = JSON.parse(req.body)
      console.log(post)
      await OwnedQualifications.create(post);
      res.status(200).json({})
      break

    case 'PUT':
      const put = JSON.parse(req.body)
      await OwnedQualifications.update(put, {where: {id: put.id}});
      res.status(200).json({})
      break

    case 'DELETE':
      const destroy = JSON.parse(req.body)
      await OwnedQualifications.destroy({where: {id: destroy.id}});
      res.status(200).json({})
      break

    default:
  }
}
