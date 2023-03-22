import React, { useState } from 'react';
import css from './ContactForm.module.css';
import { useDispatch } from 'react-redux';
import { addContact } from 'redux/operations';
import { useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    const isInBase = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (!isInBase) {
      dispatch(addContact({ name, number }));
      setName('');
      setNumber('');
    } else {
      alert(`${name} is in use. Try another name.`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css['form-container']}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label htmlFor="number">Number</label>
      <input
        type="tel"
        name="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button type="submit">Add contact</button>
    </form>
  );
};

export default ContactForm;
