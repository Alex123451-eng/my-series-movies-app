import styled from "styled-components";

import { CustomLink } from "../customLink/customLink";
import { ReactComponent as Cross } from "../../img/components/mobileMenu/close-btn.svg";

import { useUser } from "../../features/user/useUser";

import { showBodyScroll } from "../../utils/bodyScroll";

import { COLORS, FONT_SIZES, SPACING } from "../../constants/styles";
import { ROUTES } from "../../constants/routes";

import { IMobileMenu } from "../../types/types";

export const MobileMenu: React.FC<IMobileMenu> = ({
  setIsMobileMenuShown,
  onUserEmailClick,
  isLogOutShown,
  onLogoutBtnClick,
}) => {
  const { user } = useUser();

  const closeMobileMenu = (e: any) => {
    if (e.target.dataset.close) {
      showBodyScroll();
      setIsMobileMenuShown(false);
    }
  };

  return (
    <Wrapper onClick={closeMobileMenu}>
      <Nav>
        <CustomLink data-close={true} to={ROUTES.main}>
          Main
        </CustomLink>
        <CustomLink data-close={true} to={ROUTES.history}>
          Movie history
        </CustomLink>
        {user.id && (
          <CustomLink data-close={true} to={ROUTES.private}>
            Your page
          </CustomLink>
        )}
        {user.id ? (
          <UserMailLogOutWrapper>
            {isLogOutShown && (
              <LogOut>
                <Button onClick={onLogoutBtnClick}>Log out</Button>
              </LogOut>
            )}
            <UserEmail onClick={onUserEmailClick}>{user.email}</UserEmail>
          </UserMailLogOutWrapper>
        ) : (
          <CustomLink data-close={true} to={ROUTES.login}>
            Login
          </CustomLink>
        )}
      </Nav>
      <BtnClose data-close={true}>
        <Cross fill="white" />
      </BtnClose>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${COLORS.blackBackground};
  font-size: ${FONT_SIZES.lg};
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 18%;
`;

const BtnClose = styled.div`
  display: flex;
  position: absolute;
  top: ${SPACING.xl};
  right: ${SPACING.xl};
  width: 30px;
  height: 30px;
  cursor: pointer;

  svg {
    pointer-events: none;
  }
`;

const UserMailLogOutWrapper = styled.div`
  position: relative;
`;

const UserEmail = styled.span`
  cursor: pointer;
  color: ${COLORS.white};
`;

const LogOut = styled.div`
  position: absolute;
  top: 35px;
  width: 100%;
`;

const Button = styled.button`
  font-family: "nunito-regular", sans-serif;
  cursor: pointer;
  border: 1px solid ${COLORS.gray};
  border-radius: ${SPACING.sm};
  background: ${COLORS.white};
  padding: ${SPACING.sm} 0;
  width: 100%;

  &:hover {
    background: ${COLORS.whiteActive};
  }
`;
