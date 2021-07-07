import { DataTypes } from 'sequelize'
import sequelize from './db'

const PersonalContractsYearly = sequelize.define('Personal_contracts_yearly', {
  dispatchedStaffId:   { type: DataTypes.INTEGER, field: 'dispatched_staff_id', allowNull: false, defaultValue: null, },
  dates:               { type: DataTypes.DATEONLY, allowNull: false, defaultValue: null, },
  basicSalary:         { type: DataTypes.INTEGER,  field: 'basic_salary', defaultValue: null, },
  maxWorkTime:         { type: DataTypes.INTEGER, field: 'max_work_time', defaultValue: null, },
  minWorkTime:         { type: DataTypes.INTEGER, field: 'min_work_time', defaultValue: null, },
  individualUnitPrice: { type: DataTypes.INTEGER, field: 'individual_unit_price', defaultValue: null, },
  createdAt:           { type: DataTypes.DATE, field: 'created_at', defaultValue: null, },
  updatedAt:           { type: DataTypes.DATE, field: 'updated_at', defaultValue: null, }
}, {
  freezeTableName: true
});



export default PersonalContractsYearly
