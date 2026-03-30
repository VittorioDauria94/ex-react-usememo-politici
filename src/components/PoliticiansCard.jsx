export default function PoliticiansCard({ user }) {
  const { name, image, position, biography } = user;
  return (
    <div className="card h-100">
      <img src={image} className="card-img-top" alt={`immagine di ${name}`} />
      <div className="card-body">
        <h5 className="card-title">
          {name} - {position}
        </h5>
        <p className="card-text">{biography}</p>
      </div>
    </div>
  );
}
