import { DataTypes } from 'sequelize'
import sequelize from './db'

const PersonsInCharge = sequelize.define('Persons_in_charge', {
  personInChargeName:  { type: DataTypes.STRING, field: 'person_in_charge_name', allowNull: false, defaultValue: null, },
  companyId:           { type: DataTypes.INTEGER,  field: 'company_id', defaultValue: null, },
  postalCode:          { type: DataTypes.STRING, field: 'postal_code', defaultValue: null, },
  address:             { type: DataTypes.STRING, defaultValue: null, },
  workPhoneNumber:     { type: DataTypes.STRING, field: 'work_phone_number', defaultValue: null, },
  personalPhoneNumber: { type: DataTypes.STRING, field: 'personal_phone_number', defaultValue: null, },
  mailAddress:         { type: DataTypes.STRING, field: 'mail_address', defaultValue: null, },
  createdAt:           { type: DataTypes.DATE, field: 'created_at', defaultValue: null, },
  updatedAt:           { type: DataTypes.DATE, field: 'updated_at', defaultValue: null, }
}, {
  freezeTableName: true
});



export default PersonsInCharge
