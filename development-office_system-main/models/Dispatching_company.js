import { DataTypes } from 'sequelize'
import sequelize from './db'

const DispatchingCompany = sequelize.define('Dispatching_companies', {
  companyName:        { type: DataTypes.STRING, field: 'company_name', allowNull: false, defaultValue: null, },
  companyOverview:    { type: DataTypes.STRING, field: 'company_overview', defaultValue: null, },
  businessType:       { type: DataTypes.STRING, field: 'business_type', defaultValue: null, },
  postalCode:         { type: DataTypes.STRING, field: 'postal_code', defaultValue: null, },
  address:            { type: DataTypes.STRING, defaultValue: null, },
  phoneNumber:        { type: DataTypes.STRING, field: 'phone_number', defaultValue: null, },
  mailAddress:        { type: DataTypes.INTEGER, field: 'mail_address', defaultValue: null, },
  createdAt:          { type: DataTypes.DATE, field: 'created_at', defaultValue: null, },
  updatedAt:          { type: DataTypes.DATE, field: 'updated_at', defaultValue: null, }
}, {
  freezeTableName: true
});



export default DispatchingCompany
