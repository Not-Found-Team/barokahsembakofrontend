import {sidebarData} from "./SidebarData";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
const admin = require("../assets/img/admin.jpg");

const Sidebar = () => {
  return (
    <Col className="sidebar" xs={2}>
      <Row className="account">
        <Col xs={4}>
          <img src={admin} alt="profile img"></img>
        </Col>
        <Col>
          <h6>USERNAME</h6>
          <p>status</p>
        </Col>
      </Row>
      <div className="sidebar-break">Menu: </div>
      <Row className="nav-bar">
        <ul>
          {sidebarData.map((val, key) => {
            return (
              <li key={key} className="menu">
                <Col>
                  <Link
                    to={val.link}
                  >
                    {val.icon}
                    <span>{val.title}</span>
                  </Link>
                </Col>
              </li>
            );
          })}
        </ul>
      </Row>
    </Col>
  );
};

export default Sidebar;
