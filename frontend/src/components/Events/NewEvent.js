import { useRef } from 'react';

import { sendQuery } from '../../helpers/client';
import useAuth from '../../hooks/auth-hook';

const NewEvent = ({ closeModal }) => {
  const { token, userId } = useAuth();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();
  const dateRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const price = priceRef.current.value;
    const date = dateRef.current.value;

    const inputs = [title, description, price, date];

    let invalidForm;

    inputs.forEach((input) => {
      if (!input || input.trim() === '') {
        invalidForm = true;
      }
    });

    if (invalidForm) {
      return;
    }

    const query = {
      query: `
        mutation {
          createEvent(
              event: {
                  title: "${title}",
                  description: "${description}",
                  price: ${+price},
                  date: "${new Date(date).toISOString()}",
                  creator: "${userId}"
              }
            ){
            title
            description
            }
        }
    `,
    };

    await sendQuery(query, {
      Authorization: `Bearer ${token}`,
    });

    closeModal();
  };
  return (
    <form className="form" onSubmit={submitHandler}>
      <div className="form-control">
        <label htmlFor="title">Title</label>
        <input ref={titleRef} type="text" name="title" />
      </div>
      <div className="form-control">
        <label htmlFor="description">Description</label>
        <textarea ref={descriptionRef} name="description" rows={3} />
      </div>
      <div className="form-group">
        <div className="form-control">
          <label htmlFor="price">Price</label>
          <input ref={priceRef} type="number" name="price" />
        </div>
        <div className="form-control">
          <label htmlFor="date">Date</label>
          <input ref={dateRef} type="date" name="date" />
        </div>
      </div>
      <div className="form-actions">
        <button type="submit">Create</button>
      </div>
    </form>
  );
};

export default NewEvent;
