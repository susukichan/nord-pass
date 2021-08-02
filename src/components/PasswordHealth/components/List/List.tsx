import { FC, useState } from "react";
import { IItem } from "~/services/getUserItems";
import ItemIcon from "./components/ItemIcon";
import updateItem from "../../../../services/updateItem";
import Modal from "react-modal";

import "./list-style.scss";
import { UserItemsProviderHandle } from "../../useItemsProvider";

interface IList extends Pick<UserItemsProviderHandle, "refetchItems"> {
  items: Array<IItem>;
}

interface IUpdateModal extends Pick<UserItemsProviderHandle, "refetchItems"> {
  item: IItem;
}

const UpdateModal: FC<IUpdateModal> = ({ item, refetchItems }) => {
  const [showModal, setShowModal] = useState(false);
  const [newPass, setNewPass] = useState("");

  return (
    <>
      <button className="update" onClick={() => setShowModal(true)}>
        Update Password
      </button>
      <Modal
        className="modal"
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Example Modal"
        appElement={document.getElementById("app")}
      >
        <h1>Update Password</h1>
        <input
          placeholder="new password"
          className="input"
          value={newPass}
          onChange={(event) => setNewPass(event.target.value)}
        />
        <div className="pt-12px text-center">
          <button
            className="button"
            onClick={async () => {
              const rsp = await updateItem({
                ...item,
                password: newPass,
              });
              if (rsp.status === 200) {
                setNewPass("");
                setShowModal(false);
                refetchItems();
              } else {
                //  TODO handle error
                setNewPass("");
                setShowModal(false);
              }
            }}
          >
            Change
          </button>
          <button
            className="button ml-12px"
            onClick={() => {
              setNewPass("");
              setShowModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

const List: FC<IList> = ({ items, refetchItems }) => (
  <ul className="list">
    {items.map((item) => (
      <li key={item.id} className="item">
        <ItemIcon title={item.title} id={item.id} />
        <div>
          <div className="title">{item.title}</div>
          <div className="description">{item.description}</div>
        </div>
        <UpdateModal refetchItems={refetchItems} item={item} />
      </li>
    ))}
  </ul>
);

export default List;
