import { getSession } from '../../../lib/iron'
import PhoneWifis from '../../../models/phone-wifi'
import Staff from '../../../models/staff'

export default async function handler(req, res) {
  const session = await getSession(req)
  const phoneWifis = !session ? null : await PhoneWifis.findAll({
    order: [['id','ASC']],
    include:[
    {
      model:Staff,
      as:"StaffId"
    }]
  })

  res.status(200).json({ phone_wifi: phoneWifis || null })
}
