import { DataTypes } from 'sequelize'
import sequelize from './db'

const Dispatch = sequelize.define('Dispatched_staff', {
  companyNumber:       { type: DataTypes.STRING, field: 'company_number', defaultValue: null, },
  username:            { type: DataTypes.STRING, allowNull: false, defaultValue: null, },
  furigana:            { type: DataTypes.STRING, defaultValue: null, },
  maidenName:          { type: DataTypes.STRING,  field: 'maiden_name', defaultValue: null, },
  sex:                 { type: DataTypes.STRING, defaultValue: null, },
  blood_type:          { type: DataTypes.DATEONLY, field: 'blood_type', defaultValue: null, },
  birthDate:           { type: DataTypes.DATEONLY, field: 'birth_date', defaultValue: null, },
  inserviceRetired:    { type: DataTypes.STRING, field: 'inservice_retired', defaultValue: null, },
  companyId:           { type: DataTypes.INTEGER, field: 'company_id', defaultValue: null, },
  employedCategory:    { type: DataTypes.STRING, field: 'employed_category', defaultValue: null, },
  joinDate:            { type: DataTypes.DATEONLY, field: 'join_date', defaultValue: null, },
  retiredDate:         { type: DataTypes.DATEONLY,  field: 'retired_date', defaultValue: null, },
  contractEndDate:     { type: DataTypes.DATEONLY, field: 'contract_end_date', defaultValue: null, },
  createdAt:           { type: DataTypes.DATE, field: 'created_at', defaultValue: null, },
  updatedAt:           { type: DataTypes.DATE, field: 'updated_at', defaultValue: null, }
}, {
  freezeTableName: true
});



export default Dispatch
