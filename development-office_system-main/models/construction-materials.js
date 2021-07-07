import { DataTypes } from 'sequelize'
import sequelize from './db'
import Staff from './staff'


const ConstructionMaterials = sequelize.define('construction_materials',{
  orderDate:              { type: DataTypes.DATEONLY, field: 'order_date', defaultValue: null,},
  orderDistination:       { type: DataTypes.STRING, field: 'order_distination', defaultValue: null,},
  productName:            { type: DataTypes.STRING, field: 'product_name', defaultValue: null,},
  productType:            { type: DataTypes.STRING, field: 'product_type', defaultValue: null,},
  credit:                 { type: DataTypes.STRING, field: 'credit', defaultValue: null,},
  quantity:               { type: DataTypes.INTEGER, field: 'quantity', defaultValue: null,},
  unitPrice:              { type: DataTypes.INTEGER, field: 'unit_price', defaultValue: null,},
  price:                  { type: DataTypes.INTEGER, field: 'price', defaultValue: null,},
  wbs:                    { type: DataTypes.INTEGER, field: 'wbs', defaultValue: null,},
  constructionForShort:   { type: DataTypes.STRING, field: 'construction_for_short', defaultValue: null,},
  deliveryDate:           { type: DataTypes.DATEONLY, field: 'delivery_date', defaultValue: null,},
  payoutDate:             { type: DataTypes.DATEONLY, field: 'payout_date', defaultValue: null,},
  staffId:                { type: DataTypes.INTEGER, field: 'staff_id', defaultValue: null,},
  inventoryDate:          { type: DataTypes.DATEONLY, field: 'inventory_date', defaultValue: null,},
  createdAt:              { type: DataTypes.DATE, field: 'created_at', defaultValue: null,},
  updatedAt:              { type: DataTypes.DATE, field: 'updated_at', defaultValue: null,},
},{

});

ConstructionMaterials.belongsTo(Staff,{
  foreignKey: "staffId",
  targetKey: "staffId"
});



export default ConstructionMaterials
