interface ResponseModalProps {
  openModal: boolean;
  setOpenModal: Function;
  type: "lock-user" | "delete-product" | "delete-comment" | "reject-product";
}
