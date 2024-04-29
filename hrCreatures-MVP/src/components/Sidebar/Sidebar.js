import reactDOM from "react-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./style.module.css";
import { FaThList, FaRegWindowClose } from "react-icons/fa";
import sidebarMenu from "./Quick-links";
import Logo from "../UI/Logo";
import logo from "./../../images/Logo.png";
import Container from "../Layout/Container";
import SidebarSection from "../Layout/SidebarSection";
import ModuleName from "./ModuleName";
import SidebarMenu from "./SidebarMenu";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import { FaQuestion } from "react-icons/fa";
import LogoutBtn from "../UI/LogoutBtn";
import { useNavigate } from "react-router-dom";

const Sidebar = (props) => {
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);

  const toggleMenuHandler = () => {};

  const closeSideBar = () => {};

  const mainMenus = sidebarMenu.map((menu, index) => (
    <SidebarMenu
      linkActive={classes.linkActive}
      key={index}
      className={classes.mainMenusNav}
      icon={menu.icon}
      text={menu.text}
      path={menu.path}
      onCloseSidebar={closeSideBar}
    />
  ));

  const modalHelper = reactDOM.createPortal(
    <Modal
      backdropClass={classes.backDrop}
      className={classes.modal}
      icon={<FaQuestion />}
      btnContainer={`flex justify-center items-center ${classes.btnContainer}`}
      btn={
        <>
          <Button onClick={() => setIsModal(false)} text={<p>Cancel</p>} />
          <Button
            onClick={() => {
              navigate("/");
              props.onLogout();
            }}
            text={<p>Yes</p>}
          />
        </>
      }
    >
      {<p>Do you want to logout?</p>}
    </Modal>,
    document.getElementById("modal")
  );

  return (
    <>
      {isModal && modalHelper}
      <SidebarSection>
        <Container className={classes.sideBarContainer}>
          <Link to={"/"}>
            <Logo src={logo} className={classes.logo} />
          </Link>

          <FaThList
            className={classes.hamburger}
            id="on"
            onClick={toggleMenuHandler}
          />

          <div
            className={`flex flex-col justify-between content-between ${classes.toggleContainer} `}
          >
            <FaRegWindowClose
              className={classes.hamburger}
              id="off"
              onClick={toggleMenuHandler}
            />

            <div className={classes.linksContainer}>
              <ModuleName onCloseSidebar={closeSideBar} />

              <div className={classes.mainMenus}>{mainMenus}</div>

              <div className={`${classes.quickLinkHeading}`}></div>
            </div>

            <LogoutBtn
              onLogout={() => setIsModal(true)}
              className={classes.logout}
            />
          </div>
        </Container>
      </SidebarSection>
    </>
  );
};

export default Sidebar;
