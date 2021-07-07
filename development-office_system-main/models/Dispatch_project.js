import { DataTypes } from 'sequelize'
import sequelize from './db'

const DispatchProject = sequelize.define('Dispatch_projects', {
  dispatchedStaffId: { type: DataTypes.INTEGER, field: 'dispatched_staff_id', allowNull: false, defaultValue: null, },
  projectName:       { type: DataTypes.STRING, field: 'project_name', allowNull: false, defaultValue: null, },
  createdAt:         { type: DataTypes.DATE, field: 'created_at', defaultValue: null, },
  updatedAt:         { type: DataTypes.DATE, field: 'updated_at', defaultValue: null, }
}, {
  freezeTableName: true
});



export default DispatchProject
