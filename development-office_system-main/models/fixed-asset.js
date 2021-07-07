import { DataTypes } from 'sequelize'
import sequelize from './db'
import Staff from './staff'


const FixedAssets = sequelize.define('fixed_asset', {
  assetsCode:            { type: DataTypes.STRING, field: 'assets_code', defaultValue: null, },
  assetsType:            { type: DataTypes.STRING, field: 'assets_type', defaultValue: null, },
  assetsName:            { type: DataTypes.STRING, field: 'assets_name', defaultValue: null, },
  quantity:              { type: DataTypes.INTEGER, field: 'quantity', defaultValue: null, },
  getDate:               { type: DataTypes.DATEONLY, field: 'get_date', defaultValue: null, },
  commonDate:            { type: DataTypes.DATEONLY, field: 'common_date', defaultValue: null, },
  userId:                { type: DataTypes.INTEGER, field: 'user_id', defaultValue: null, },
  usePlace:              { type: DataTypes.STRING, field: 'use_place', defaultValue: null, },
  getPrice:              { type: DataTypes.INTEGER, field: 'get_price', defaultValue: null, },
  tax:                   { type: DataTypes.INTEGER, field: 'tax', defaultValue: null, },
  taxRate:               { type: DataTypes.DECIMAL, field: 'tax_rate', defaultValue: null, },
  remainPrice:           { type: DataTypes.INTEGER, field: 'remain_price', defaultValue: null, },
  repaymentMethod:       { type: DataTypes.STRING, field: 'repayment_method', defaultValue: null, },
  serviceLife:           { type: DataTypes.INTEGER, field: 'service_life', defaultValue: null, },
  currentTermRepayment:  { type: DataTypes.INTEGER, field: 'current_term_repayment', defaultValue: null, },
  endOfTermBookValue:    { type: DataTypes.INTEGER, field: 'end_of_term_book_value', defaultValue: null, },
  repaymentWbscode:      { type: DataTypes.INTEGER, field: 'repayment_wbscode', defaultValue: null, },
  repaymentWbsname:      { type: DataTypes.STRING, field: 'repayment_wbsname', defaultValue: null, },
  other:                 { type: DataTypes.TEXT, field: 'other', defaultValue: null, },
  inventoryDate:         { type: DataTypes.DATEONLY, field: 'inventory_date', defaultValue: null, },
  staffId:               { type: DataTypes.INTEGER, field: 'staff_id', defaultValue: null, },
  note:                  { type: DataTypes.TEXT, field: 'note', defaultValue: null, },
  createdAt:             { type: DataTypes.DATE, field: 'created_at', defaultValue: null, },
  updatedAt:             { type: DataTypes.DATE, field: 'updated_at', defaultValue: null, },
},{
  freezeTableName: true
})

FixedAssets.belongsTo(Staff,{
  foreignKey:"userId",
  targetKey:"staffId",
  as:"UserId"
});

FixedAssets.belongsTo(Staff,{
  foreignKey:"staffId",
  targetKey:"staffId",
  as:"StaffId"
});

export default FixedAssets
