import Link from "next/link";
import data from "../data/quicklinks.json";

const Header = () => {
    return ( 
        <header className="header" id="header">
        <div className="container">
          <div className="header__content">

            <input type="checkbox" id="menu-toggle" hidden />
            <label className="hamburger" htmlFor="menu-toggle">
                  <span></span>
                  <span></span>
                  <span></span>
            </label>
            <div className="header__content-links">
              <ul className="header__links">
              {data.map((item, index) => (
                item.id ? (
                    <li className="header__links-item" style={{ animationDelay: `${200 * (index + 1)}ms` }}>
                    <Link href={item.href} title={item.title}>
                        {item.text}
                    </Link>
                    </li>
                ) : null
                ))}

    
              </ul>
            </div>
          </div>
        </div>
      </header>
     );
}
export default Header;