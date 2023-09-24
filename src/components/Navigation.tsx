import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const items: MenuProps['items'] = [
  {
    label: <Link to='/home'>Home</Link>,
    key: 'home',
  },
  {
    label: <Link to='/dashboard'>Dashboard</Link>,
    key: 'dashboard',
  },
  {
    label: <Link to='/films'>Films</Link>,
    key: 'films',
  },
/*  TO-DO: 
 {
    label: 'People',
    key: 'people',
  },
  {
    label: 'Locations',
    key: 'locations',
  },
  {
    label: 'Species',
    key: 'species',
  },
  {
    label: 'Vehicles',
    key: 'vehicles',
  },*/
];

function Navigation() {
  const location = useLocation();
  const currentPage = location.pathname.replace("/", "");

  return <Menu
    selectedKeys={[currentPage]}
    mode="horizontal"
    items={items}

    className={"darkBackground lightText"}

    style={{
      height: "75px",
      fontSize: "24px",
      display: "flex",
      placeItems: "flex-end",
      paddingLeft: "2rem",
      position: "fixed",
      zIndex: "10",
      top: "0",
      width: "100%"
    }}
  />
}



export default Navigation;