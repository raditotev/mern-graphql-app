import './Modal.css';

const Backdrop = ({ onCancel }) => (
  <div className="modal-backdrop" onClick={onCancel}></div>
);

const Modal = ({ title, onCancel, children }) => {
  return (
    <>
      <Backdrop onCancel={onCancel} />
      <div className="modal">
        <header className="modal__header">
          <h1>{title}</h1>
        </header>
        <section className="modal__content">{children}</section>
      </div>
    </>
  );
};

export default Modal;
