import Link from "next/link";

const Header = () => {
    return ( 
        <div className="header">
        Header
        <Link href="/contact">Contact</Link>
        <Link href="/services">Services</Link>
        </div>
     );
}
 
export default Header;