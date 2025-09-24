import { Link } from "react-router-dom"

const ads = [
  { id: 1, title: "Uy ijaraga 1" },
  { id: 2, title: "Uy ijaraga 2" },
  { id: 3, title: "Uy ijaraga 3" },
]

const Home = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Ads</h1>
      <ul className="space-y-2">
        {ads.map((ad) => (
          <li key={ad.id}>
            <Link to={`/ads/${ad.id}`} className="text-blue-500 hover:underline">
              {ad.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
