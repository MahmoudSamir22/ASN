import Follow from '../models/follow.model';
import User from '../models/user.model';
import UserPrivacySettings from '../models/user-privacy-settings.model';

export function associateModels() {
  // USER ASSOCIATIONS
  User.hasOne(UserPrivacySettings, { foreignKey: 'user_id', as: 'PrivacySettings' });

  // USER PRIVACY SETTINGS ASSOCIATIONS
  UserPrivacySettings.belongsTo(User, { foreignKey: 'user_id' });

  // FOLLOW ASSOCIATIONS
  User.hasMany(Follow, { foreignKey: 'follower_id', as: 'Following' });
  User.hasMany(Follow, { foreignKey: 'followee_id', as: 'Followers' });
  Follow.belongsTo(User, { foreignKey: 'follower_id', as: 'Follower' });
  Follow.belongsTo(User, { foreignKey: 'followee_id', as: 'Followee' });
}

export default { User, UserPrivacySettings, Follow };
