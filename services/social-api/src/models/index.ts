import Follow from '../models/follow.model';
import User from '../models/user.model';
import UserBlock from '../models/user-block.model';
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

  // USER BLOCK ASSOCIATIONS
  User.hasMany(UserBlock, { foreignKey: 'blocker_id', as: 'BlockedUsers' });
  User.hasMany(UserBlock, { foreignKey: 'blocked_id', as: 'BlockedByUsers' });
  UserBlock.belongsTo(User, { foreignKey: 'blocker_id', as: 'Blocker' });
  UserBlock.belongsTo(User, { foreignKey: 'blocked_id', as: 'BlockedUser' });
}

export default { User, UserPrivacySettings, Follow, UserBlock };
