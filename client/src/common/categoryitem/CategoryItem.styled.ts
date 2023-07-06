import styled from 'styled-components';

const CategoryWrapper = styled.div`
  width: 120px;
  height: 80px;
  gap: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const CategoryIcon = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 100px;
  background: url(${(props) => props.src}), lightgray 50% / cover no-repeat,
    #d9d9d9;
`;

const Categorytext = styled.div`
  color: #000;
  text-align: center;
  font-size: 20px;
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  &.selected {
    color: #0096c7;
    text-decoration-line: underline;
  }
`;

export { CategoryWrapper, CategoryIcon, Categorytext };
