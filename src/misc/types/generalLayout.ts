export interface GeneralListItemProps {
  leftIcon?: React.JSX.ElementType;
  rightIcon?: React.JSX.ElementType;
  onClickRightIcon?: Function;
  onClick?: Function
  hover?: boolean;
  description?: React.JSX.ElementType | string;
  label?: string;
  id?:string;
}

export interface GeneralLayoutProps {
  children?: React.ReactNode;
  onBackClick?: any;
  title: String;
}
