import { useSelector, useDispatch } from "react-redux";
import { selectContacts, selectFilter } from 'redux/contacts/selectors';
import ContactItem from "components/ContactItem/ContactItem";
import { useEffect } from "react";
import { fetchContacts } from "redux/contacts/operations";
import s from './ContactList.module.css';

export default function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (!contacts) return null;

  const contactsFiltered = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (contactsFiltered) {
    return (
      <ul>
        {contactsFiltered.map(({ id, name, number }) => (
          <li className={s.li} key={id}>
            <ContactItem id={id} name={name} number={number} />
          </li>
        ))}
      </ul>
    );
  }
}