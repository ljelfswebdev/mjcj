import Link from "next/link";

const ServiceCard = ({ service }) => { 
  return ( 
    <Link href={`/services/${service.id}`} className="service__card">
      <div className="service__card-overlay"></div>
      <div className="service__card-content">
        <p className="service__card-text service__card-text--title">{service.title.rendered}</p>
        <p className="service__card-text">{service.acf.slide_text}</p>
      </div>

      {/* Display the image URL */}
      {service.imageURL && (
        <img src={service.imageURL} alt={service.title.rendered}  className="service__card-image"/>
      )}
      </Link>
   );
}
 
export default ServiceCard;