import { useState } from 'react';

import Modal from '../components/UI/Modal';
import NewEvent from '../components/Events/NewEvent';

import './EventsPage.css';

const EventsPage = () => {
  const [showModal, setShowModal] = useState(false);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const hideModalHandler = () => {
    setShowModal(false);
  };
  return (
    <>
      {showModal ? (
        <Modal title="Create new event" onCancel={hideModalHandler}>
          <NewEvent closeModal={hideModalHandler} />
        </Modal>
      ) : null}
      <div className="events-page">
        <h1>Share new event with your friends</h1>
        <button className="btn" type="button" onClick={showModalHandler}>
          Create event
        </button>
      </div>
    </>
  );
};

export default EventsPage;
