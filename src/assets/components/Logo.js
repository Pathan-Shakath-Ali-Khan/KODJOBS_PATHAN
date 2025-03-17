import styled from '@emotion/styled';

export const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 2px;
  
  span {
    color: ${props => props.theme.colors.accent};
  }
`; 