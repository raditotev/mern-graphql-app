import './Modal.css';

const Backdrop: React.FC<{ onCancel: () => void }> = ({ onCancel }) => (
  <div className="modal-backdrop" onClick={onCancel}></div>
);

const Modal: React.FC<{
  title: string;
  onCancel: () => void;
  canConfirm?: boolean;
  onConfirm: () => void;
  confirmText?: string;
}> = ({ title, onCancel, canConfirm, onConfirm, confirmText, children }) => {
  return (
    <>
      <Backdrop onCancel={onCancel} />
      <div className="modal">
        <header className="modal__header">
          <h1>{title}</h1>
        </header>
        <section className="modal__content">{children}</section>
        <footer className="modal__footer">
          <button className="btn" type="button" onClick={() => onCancel()}>
            Cancel
          </button>
          {canConfirm && (
            <button className="btn" type="button" onClick={onConfirm}>
              {!!confirmText ? confirmText : 'Confirm'}
            </button>
          )}
        </footer>
      </div>
    </>
  );
};

export default Modal;
