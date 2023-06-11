import { sidebarData } from "./SidebarData";
import { Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
const adminImage = require("../assets/img/admin.jpg");
const userImage = require("../assets/img/user.jpg")

const Sidebar = (props) => {
  const user = props?.user;
  return (
    <Col xs={2} className="sidebar">
      <Row className="account flex-row align-item-center">
        <Col xs={4}>
          <img src={user?.role == 'admin' ? adminImage:userImage} alt="profile img"></img>
        </Col>
        <Col>
          {user?.role
            ? [<h3 key={1}>{user?.username.toUpperCase()}</h3>, <p key={2}>{user?.username}</p>]
            : [<h3 key={1}>USERNAME</h3>, <p key={2}>Status</p>]}
        </Col>
      </Row>
      <div className="sidebar-break">Menu: </div>
      <Row className="nav-bar">
        <ul>
          {sidebarData.map((val, key) => {
            return (
              <li key={key} className="menu">
                <Col key={key}>
                  <Link to={`${props.url}${val.link}`}>
                    {val.icon}
                    <span key={key}>{val.title}</span>
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
