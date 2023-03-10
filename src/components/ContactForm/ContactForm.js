import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContacts } from 'redux/contacts/operations';
import { selectContacts } from 'redux/contacts/selectors';
import { nanoid } from 'nanoid';
import s from './ContactForm.module.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

export default function ContactForm() {
  const contacts = useSelector(selectContacts);
  console.log(contacts);

  const dispatch = useDispatch();

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const formSubmitHandle = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const { name, number } = form;
    const resultName = name.value
      .toLowerCase()
      .split(/\s+/)
      .map(word => word[0].toUpperCase() + word.substring(1))
      .join(' ');

    const newContact = {
      id: nanoid(),
      name: resultName,
      number: number.value,
    };

    const isExsistName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    const isExsistNumber = contacts.some(contact => contact.number === number);

    if (isExsistName) {
      resetForm();
      return Report.failure('', `${name} is already in contact`);
    } else if (isExsistNumber) {
      resetForm();
      const { name } = contacts.find(contact => contact.number === number);
      return Report.failure('', `${number} is already in contact as ${name}`);
    }

    dispatch(addContacts(newContact));
    form.reset();
  };

  return (
    <form className={s.form} onSubmit={formSubmitHandle}>
      <label className={s.label} htmlFor={nameInputId}>
        Name
      </label>
      <input
        className={s.input}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />

      <label className={s.label} htmlFor={numberInputId}>
        Number
      </label>
      <input
        className={s.input}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />

      <button className={s.button} type="submit">
        Add contact
      </button>
    </form>
  );
}
