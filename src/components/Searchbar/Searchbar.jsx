import { StyledSearch, SearchForm, BtnSubmit, Input } from './Searchbar.Styled';
import { BiSearchAlt } from 'react-icons/bi';

const Searchbar = ({ submit }) => {
  const formSubmit = event => {
    event.preventDefault();
    const inputValue = event.target.elements.query.value;
    submit(inputValue);
    event.target.reset();
  };
  return (
    <StyledSearch>
      <SearchForm onSubmit={formSubmit}>
        <Input type="text" name="query" />
        <BtnSubmit type="submit">
          <BiSearchAlt />
        </BtnSubmit>
      </SearchForm>
    </StyledSearch>
  );
};

export default Searchbar;
