import { FC } from 'react';

interface IItemIcon {
  title: string,
  id:string
}

const ItemIcon: FC<IItemIcon> = ({title,id}) => (
  <div className={`item-icon item-icon--${id}`}>
    {title.substring(0, 2)}
  </div>
);

export default ItemIcon;
