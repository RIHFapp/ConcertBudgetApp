import { Link } from "react-router-dom";
const Nav = () => {
    return(
        <>
        <div class="hamburger-menu">
    <input id="menu__toggle" type="checkbox" />
    <label class="menu__btn" for="menu__toggle">
      <span></span>
    </label>

    <ul className="menu__box">
            <Link to={`/`}>
            <li className="menu__item">Home</li>
            </Link>
            <Link to={`/searchPage`}>
			<li className="menu__item">Creat New list</li>
            </Link>
			<Link to={`/listOfLists`}>
            <li className="menu__item">Browser Lists</li>
            </Link>
			<Link to={`/credit`}>
            <li className="menu__item">Credits</li>
            </Link>
    </ul>
  </div>
        </>
    )
}
export default Nav;