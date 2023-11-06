import Link from "next/link";
import data from "../data/quicklinks.json";

const Header = () => {
    return ( 
        <header class="header" id="header">
        <div class="container">
          <div class="header__content">

            <input type="checkbox" id="menu-toggle" hidden />
            <label class="hamburger" for="menu-toggle">
                  <span></span>
                  <span></span>
                  <span></span>
            </label>
            <div class="header__content-links">
              <ul class="header__links">
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