import styled from 'styled-components';
const ProfilePhoto = styled.div`
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  align-items: center;
  background-color: ${({ $color }) => $color};
  border-radius: 50%;
`;

const StyledActionIconsContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-around;
  img {
    max-width: 16px;
  }
  position: absolute;
  right: 60px;
  top: 50%;
  transform: translateY(-50%);
  @media only screen and (max-width: 425px) {
    position: absolute;
    right: 35px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export { ProfilePhoto, StyledActionIconsContainer };
