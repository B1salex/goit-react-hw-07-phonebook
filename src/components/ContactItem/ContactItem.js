import { useDispatch } from 'react-redux';
import { deleteContacts } from 'redux/contacts/operations';
import PropTypes from 'prop-types';
import s from './ContactItem.module.css';

export default function ContactItem({ id, name, number }) {
  const dispatch = useDispatch();
  return (
    <>
      <span>
        {name}: {number}
      </span>
      <button
        className={s.button}
        type="submit"
        name={name}
        onClick={() => dispatch(deleteContacts(id))}
      >
        Delete
      </button>
    </>
  );
}

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
