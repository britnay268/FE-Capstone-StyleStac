import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function SearchBar({ onSearch }) {
  const handleChange = (e) => {
    onSearch(e.target.value.toLowerCase());
  };

  return (
    <Form className="d-flex text search">
      <Form.Control
        type="search"
        placeholder="Search Hairstyle Name"
        className="me-2 search-bar"
        aria-label="Search"
        name="search"
        onChange={handleChange}
      />
    </Form>

  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
