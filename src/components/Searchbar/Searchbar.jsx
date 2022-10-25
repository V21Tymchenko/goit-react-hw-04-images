import css from './Searchbar.module.css';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';

function Searchbar({ onSubmit }) {
  const handleOnSubmit = event => {
    event.preventDefault();
    const imageValue = event.target.elements.imageName.value.toLowerCase();
    onSubmit(imageValue);
    event.target.reset();
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleOnSubmit}>
        <button type="submit" className={css.SearchForm_button}>
          <span className={css.SearchForm_button_label}>
            <BsSearch />
          </span>
        </button>

        <input
          className={css.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="imageName"
        />
      </form>
    </header>
  );
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  imageName: PropTypes.string,
};
