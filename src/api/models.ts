export const readyModels = {
  Pages: { plural: 'Pages', singular: 'Page' },
  PageView: { plural: 'PageViews', singular: 'PageView' },
  User: { plural: 'Users', singular: 'User' },
  Role: { plural: 'Roles', singular: 'Role' },
  Permission: { plural: 'Permissions', singular: 'Permission' },
  Notifications: { plural: 'Notifications', singular: 'Notification' },
  Suggestions: { plural: 'Suggestions', singular: 'Suggestion' },
  Notes: { plural: 'Notes', singular: 'Note' },
  EventCalendar: { plural: 'EventCalendars', singular: 'EventCalendar' },
  UserDevice: { plural: 'UserDevices', singular: 'UserDevice' },
  ViewNotification: { plural: 'ViewNotifications', singular: 'ViewNotification' },
  Partner: { plural: 'Partners', singular: 'Partner' },
  ErrorFeedback: { plural: 'ErrorFeedbacks', singular: 'ErrorFeedback' },
  ErrorLog: { plural: 'ErrorLogs', singular: 'ErrorLog' },
  /// Lead
  LeadStatus: { plural: 'LeadStatuses', singular: 'LeadStatus' },
  Lead: { plural: 'Leads', singular: 'Lead' },
  LeadHistory: { plural: 'LeadHistories', singular: 'LeadHistory' },
  LeadComment: { plural: 'LeadComments', singular: 'LeadComment' },
  LeadStatusHistory: { plural: 'LeadStatusHistories', singular: 'LeadStatusHistory' },
  TgGroup: { plural: 'TgGroups', singular: 'TgGroup' },
  /// Academy - Mentors
  Mentor: { plural: 'Mentors', singular: 'Mentor' },
  /// Academy - Courses
  CourseCategory: { plural: 'CourseCategories', singular: 'CourseCategory' },
  Course: { plural: 'Courses', singular: 'Course' },
  CourseEnrollment: { plural: 'CourseEnrollments', singular: 'CourseEnrollment' },
  Lesson: { plural: 'Lessons', singular: 'Lesson' },
  Module: { plural: 'Modules', singular: 'Module' },
  /// Academy - Assignments & Tasks
  Assignment: { plural: 'Assignments', singular: 'Assignment' },
  UserAssignment: { plural: 'UserAssignments', singular: 'UserAssignment' },
  Task: { plural: 'Tasks', singular: 'Task' },
  UserTask: { plural: 'UserTasks', singular: 'UserTask' },
  /// Academy - Other
  Bookmark: { plural: 'Bookmarks', singular: 'Bookmark' },
  Event: { plural: 'Events', singular: 'Event' },
  /// Shop
  ShopCategory: { plural: 'ShopCategories', singular: 'ShopCategory' },
  Product: { plural: 'Products', singular: 'Product' },
  FavoriteProduct: { plural: 'FavoriteProducts', singular: 'FavoriteProduct' },
  Order: { plural: 'Orders', singular: 'Order' },
  OrderItem: { plural: 'OrderItems', singular: 'OrderItem' },
  /// Coins
  CoinHistory: { plural: 'CoinHistories', singular: 'CoinHistory' },
};

// export type Models = Record<string, Record<string, unknown> & { name: string }>;
export type Model = { name: string; plural: string; singular: string };
export type Models = Record<string, Model>;

export type ModelsNames = keyof typeof readyModels;

export const models: Models = Object.keys(readyModels).reduce(
  (previousValue, currentValue, currentIndex) => ({
    ...previousValue,
    [currentValue]: {
      plural: currentValue + 's',
      singular: currentValue,
      ...((readyModels as Record<string, unknown>)[currentValue] as Object),
      name: currentValue,
    },
  }),
  {},
);
