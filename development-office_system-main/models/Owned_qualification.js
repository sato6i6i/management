import { DataTypes } from 'sequelize'
import sequelize from './db'

const OwnedQualification = sequelize.define('Owned_qualifications', {
  dispatchedStaffId: { type: DataTypes.INTEGER, field: 'dispatched_staff_id', allowNull: false, defaultValue: null, },
  qualification:       { type: DataTypes.STRING, allowNull: false, defaultValue: null, },
  createdAt:           { type: DataTypes.DATE, field: 'created_at', defaultValue: null, },
  updatedAt:           { type: DataTypes.DATE, field: 'updated_at', defaultValue: null, }
}, {
  freezeTableName: true
});

export default OwnedQualification
