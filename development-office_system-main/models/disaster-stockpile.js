import { DataTypes } from 'sequelize'
import sequelize from './db'
import Staff from './staff'


const DisasterStockpiles = sequelize.define('disaster_stockpile', {
  comfirmDate:      { type: DataTypes.DATEONLY, field: 'comfirm_date', defaultValue: null, },
  productName:      { type: DataTypes.STRING, field: 'product_name', defaultValue: null, },
  buyQuantity:      { type: DataTypes.INTEGER, field: 'buy_quantity', defaultValue: null, },
  boxes:            { type: DataTypes.INTEGER, field: 'boxes', defaultValue: null, },
  stock:            { type: DataTypes.INTEGER, field: 'stock', defaultValue: null, },
  retailer:         { type: DataTypes.STRING, field: 'retailer', defaultValue: null, },
  buyPrice:         { type: DataTypes.INTEGER, field: 'buy_price', defaultValue: null, },
  storagePeriod:    { type: DataTypes.DATEONLY, field: 'storage_period', defaultValue: null, },
  status:           { type: DataTypes.STRING, field: 'status', defaultValue: null, },
  storagePlace:     { type: DataTypes.STRING, field: 'storage_place', defaultValue: null, },
  note1:            { type: DataTypes.TEXT, field: 'note_1', defaultValue: null, },
  note2:            { type: DataTypes.TEXT, field: 'note_2', defaultValue: null, },
  newApprovalDoc:   { type: DataTypes.STRING, field: 'new_approval_doc', defaultValue: null, },
  staffId:          { type: DataTypes.INTEGER, field: 'staff_id', defaultValue: null, },
  createdAt:        { type: DataTypes.DATE, field: 'created_at', defaultValue: null, },
  updatedAt:        { type: DataTypes.DATE, field: 'updated_at', defaultValue: null, },
},{
  freezeTableName: true
});

DisasterStockpiles.belongsTo(Staff,{
  foreignKey: "staffId",
  targetKey: "staffId"
});

export default DisasterStockpiles
