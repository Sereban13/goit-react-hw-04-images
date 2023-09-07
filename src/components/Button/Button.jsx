import { BtnLoad } from './Button.Styled';

const BtnLoadMore = ({ clickLoadMore }) => {
  return (
    <BtnLoad type="butoon" onClick={clickLoadMore}>
      Load more
    </BtnLoad>
  );
};

export default BtnLoadMore;
