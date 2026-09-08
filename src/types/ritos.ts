export interface MediaContent {
  type: 'image' | 'video';
  url: string;
  caption?: string;
}

export interface Section {
  title?: string;
  subTitle?: string;
  texts?: string[];
  items?: string[];
  media?: MediaContent;
  iconName?: string;
}

export interface RightContent {
  variationTitle: string;
  sections: Section[];
}

export interface LeftTopic {
  title: string;
  items?: string[];
  texts?: string[];
  media?: MediaContent;
  iconName?: string;
}

export interface ContentSideMenu {
  menuTitle: string;
  leftSubTitle?: string;
  rightSubTitle?: string;
  leftContent: LeftTopic[];
  rightContent: RightContent[];
}

export interface SideMenuItem {
  navButton: string;
  refContent: string;
  iconName?: string;
  navContent: ContentSideMenu[];
}
