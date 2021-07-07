import { getSession } from '../../../lib/iron'
import Staff from '../../../models/staff'

export default async function staffHandler(req, res) {
  const session = await getSession(req)
  
 console.log(req.query.id)

  switch (req.method) {
    case 'GET':
      if (!session) {
        res.status(200).json({ staff: null })
        break
      }
      const staff = req.query.id == 'new' ? [Staff.build()] : await Staff.findAll({where: {id: req.query.id}})
      res.status(200).json({staff: staff})
      break

    case 'POST':
      console.error('POSTの中に入ったよ');
      console.error('req.body =' + req.body);
      const post = JSON.parse(req.body)
      console.error('POSTの中に入ったよ2');
      console.error('post =' + post);
      await Staff.create(post);
      console.error('POSTの中に入ったよ3');
      res.status(200).json({})
      break

    case 'PUT':
      const put = JSON.parse(req.body)
      await Staff.update(put, {where: {id: put.id}});
      res.status(200).json({})
      break

    case 'DELETE':
      const destroy = JSON.parse(req.body)
      await Staff.destroy({where: {id: destroy.id}});
      res.status(200).json({})
      break

    default:
  }
}
