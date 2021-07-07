import { getSession } from '../../../lib/iron'
import HoldOnto from '../../../models/hold-onto'
import Staff from '../../../models/staff'

export default async function handler(req, res) {
  const session = await getSession(req)
  const holdontos = !session ? null : await HoldOnto.findAll({
    order: [['id','ASC']],
    include: [{
      model: Staff,
      as: "customerS",
    },
    {
      model: Staff,
      as: "getS",
    },
    {
      model: Staff,
      as: "payoutS",
    }
  ]

  });

  res.status(200).json({ hold_onto: holdontos || null })
}
