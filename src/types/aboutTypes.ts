export interface UserSettingsFeatures {
  chatHistorial: string;
  chatHistorialText: string;
  changePlan: string;
  changePlanText: string;
  logout: string;
  logoutText: string;
}

export interface SidebarFeatures {
  username: string;
  usernameText: string;
  activeRoom: string;
  activeRoomText: string;
  booksSearch: string;
  booksSearchText: string;
  activeBooksSearch: string;
  activeBooksSearchText: string;
  booksStorage: string;
  booksStorageText: string;
}

export interface Sections {
  sidebar: string;
  sidebarText: string;
  sidebarFeatures: SidebarFeatures;
  chat: string;
  chatText: string;
  userSettings: string;
  userSettingsFeatures: UserSettingsFeatures;
}

export interface What {
  title: string;
  text: string;
}

export interface Actions {
  title: string;
  text: string;
}

export interface Features {
  title: string;
  sections: Sections;
}

export interface ActiveContent {
  id: string;
  lang: string;
  what: What;
  actions: Actions;
  features: Features;
  contact: string;
}