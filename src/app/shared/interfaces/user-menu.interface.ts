export interface UserMenuItem {
  icon: string;
  label: string;
  route?: string;
  action?: () => void;
}

export interface UserMenuData {
  photoUrl: string;
  username: string;
  email: string;
  menuItems: UserMenuItem[];
}
