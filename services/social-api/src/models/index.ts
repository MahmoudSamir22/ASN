import User from '../models/user.model';
import UserPrivacySettings from '../models/user-privacy-settings.model';

export function associateModels() {
  // USER ASSOCIATIONS
  User.hasOne(UserPrivacySettings, { foreignKey: 'user_id', as: 'PrivacySettings' });

  // USER PRIVACY SETTINGS ASSOCIATIONS
  UserPrivacySettings.belongsTo(User, { foreignKey: 'user_id' });
}

export default { User, UserPrivacySettings };
