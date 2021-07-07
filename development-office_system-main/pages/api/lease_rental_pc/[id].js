import { getSession } from '../../../lib/iron'
import LeaseRentalPcs from '../../../models/lease-rental-pc'
import Staff from '../../../models/staff'

export default async function staffHandler(req, res) {
  const session = await getSession(req)
  console.log(req.query.id)

  switch (req.method) {
    case 'GET':
      if (!session) {
        res.status(200).json({lease_rental_pc: null})
        break
      }
      const pcs =
        req.query.id == 'new' ? [LeaseRentalPcs.build()] : await LeaseRentalPcs.findAll({where: {id: req.query.id}});
      const staff = !session ? null : await Staff.findAll({
            attributes: ['staffId','fullName'],
            order: [['staffId','ASC']]
      })
      res.status(200).json({lease_rental_pc: pcs,staff:staff || null})
      break

    case 'POST':
      const post = JSON.parse(req.body)
      console.log(post)
      await LeaseRentalPcs.create(post);
      res.status(200).json({})
      break

    case 'PUT':
      const put = JSON.parse(req.body)
      await LeaseRentalPcs.update(put, {where: {id: put.id}});
      res.status(200).json({})
      break

    case 'DELETE':
      const destroy = JSON.parse(req.body)
      await LeaseRentalPcs.destroy({where: {id: destroy.id}});
      res.status(200).json({})
      break

    default:
  }
}
