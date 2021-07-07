import { DataTypes } from 'sequelize'
import sequelize from './db'

const CompanyContract = sequelize.define('Company_contract', {
  companyId:           { type: DataTypes.INTEGER,  field: 'company_id', allowNull: false, defaultValue: null, },
  companyContractEndDate:       { type: DataTypes.DATEONLY, field: 'company_contract_end_date', allowNull: false, defaultValue: null, },
  dayOverWorkTime:          { type: DataTypes.FLOAT,  field: 'day_over_work_time', defaultValue: null, },
  daySpecialOverWorkTime:          { type: DataTypes.FLOAT, field: 'day_special_over_work_time', defaultValue: null, },
  monthOverWorkTime:           { type: DataTypes.FLOAT, field: 'month_over_work_time', defaultValue: null, },
  monthSpecialOverWorkTime:    { type: DataTypes.FLOAT, field: 'month_special_over_work_time', defaultValue: null, },
  yearOverWorkTime:           { type: DataTypes.FLOAT, field: 'year_over_work_time', defaultValue: null, },
  yearSpecialOverWorkTime:    { type: DataTypes.FLOAT, field: 'year_special_over_work_time', defaultValue: null, },
  extentionsNumber:           { type: DataTypes.INTEGER, field: 'extentions_number', defaultValue: null, },
  holidayWorkNumber:           { type: DataTypes.INTEGER, field: 'holiday_work_number', defaultValue: null, },
  holiday:           { type: DataTypes.STRING, defaultValue: null, },
  workStartTime:           { type: DataTypes.TIME, field: 'work_start_time', defaultValue: null, },
  workEndTime:           { type: DataTypes.TIME, field: 'work_end_time', defaultValue: null, },
  remarks:           { type: DataTypes.TIME, defaultValue: null, },
  createdAt:           { type: DataTypes.DATE, field: 'created_at', defaultValue: null, },
  updatedAt:           { type: DataTypes.DATE, field: 'updated_at', defaultValue: null, }
}, {
  freezeTableName: true
});



export default CompanyContract
