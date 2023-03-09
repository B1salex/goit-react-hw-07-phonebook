import { useSelector, useDispatch } from 'react-redux';
import { selectFilter } from 'redux/contacts/selectors';
import { setNameFilter } from 'redux/contacts/filterSlice'; 
import s from './Filter.module.css';



const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  return (
    <label className={s.label}>
      Find contacts by name
      <input
        className={s.input}
        type="text"
        name="filter"
        value={filter}
        placeholder=" type the name for search"
        onChange={e => dispatch(setNameFilter(e.target.value))}
        required
      />
    </label>
  );
}

export default Filter;
