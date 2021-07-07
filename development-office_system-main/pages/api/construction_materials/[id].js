import { getSession } from '../../../lib/iron'
import ConstructionMaterials from '../../../models/construction-materials'
import Staff from '../../../models/staff'

export default async function staffHandler(req, res) {
  const session = await getSession(req)
  console.log(req.query.id)

  switch (req.method) {
    case 'GET':
      if (!session) {
        res.status(200).json({construction_materials: null})
        break
      }
      const cmaterials =
        req.query.id == 'new' ? [ConstructionMaterials.build()] : await ConstructionMaterials.findAll({where: {id: req.query.id}});
      const staff = !session ? null : await Staff.findAll({
          attributes: ['staffId','fullName'],
          order: [['staffId','ASC']]
      })
      res.status(200).json({construction_materials: cmaterials,staff: staff || null})
      break

    case 'POST':
      const post = JSON.parse(req.body)
      console.log(post)
      await ConstructionMaterials.create(post);
      res.status(200).json({})
      break

    case 'PUT':
      const put = JSON.parse(req.body)
      await ConstructionMaterials.update(put, {where: {id: put.id}});
      res.status(200).json({})
      break

    case 'DELETE':
      const destroy = JSON.parse(req.body)
      await ConstructionMaterials.destroy({where: {id: destroy.id}});
      res.status(200).json({})
      break

    default:
  }
}
