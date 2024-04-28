import {} from 'react'
import CreateBaggage from './createBaggage'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <CreateBaggage />
      <br />
      <hr />
      <button><Link to="/scanner">View Scanners</Link></button>
      <br />
      <button><Link to="/bagById">see bag info by Id </Link></button>
      <br />
      <button><Link to="/updatebagLocation">update bag Location </Link></button>
      <br />
      <button><Link to="/dashboard">dashboard </Link></button>

    </div>
  )
}

export default Home
