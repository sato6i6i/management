import { DataTypes } from 'sequelize'
import sequelize from './db'
import Staff from './staff'


const LeaseRentalPcs = sequelize.define('lease_rental_pc',{
  contracTnumber:  { type: DataTypes.STRING, field: 'contract_number', defaultValue: null,},
  productName:     { type: DataTypes.STRING, field: 'product_name', defaultValue: null,},
  os:              { type: DataTypes.STRING, field: 'os', defaultValue: null,},
  officeVer:       { type: DataTypes.INTEGER, field: 'office_ver', defaultValue: null,},
  pcName:          { type: DataTypes.STRING, field: 'pc_name', defaultValue: null,},
  contractStart:   { type: DataTypes.DATEONLY, field: 'contract_start', defaultValue: null,},
  contractEnd:     { type: DataTypes.DATEONLY, field: 'contract_end', defaultValue: null,},
  userId:          { type: DataTypes.INTEGER, field: 'user_id', defaultValue: null,},
  ipAddress:       { type: DataTypes.STRING, field: 'ip_address', defaultValue: null,},
  vpn:             { type: DataTypes.INTEGER, field: 'vpn', defaultValue: null,},
  monthly:         { type: DataTypes.INTEGER, field: 'monthly', defaultValue: null,},
  createdAt:       { type: DataTypes.DATE, field: 'created_at', defaultValue: null,},
  updatedAt:       { type: DataTypes.DATE, field: 'updated_at', defaultValue: null,},
},{
  freezeTableName: true
});

LeaseRentalPcs.belongsTo(Staff,{
  foreignKey: "userId",
  targetKey: "staffId"
});

export default LeaseRentalPcs
