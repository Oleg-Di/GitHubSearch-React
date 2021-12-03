import { Card } from "../components/Cart";
import { Search } from "../components/Search";

export const Home = () => {
  return (
    <div>
      <Search />
      

     <div className='row'>
     <div className="col-sm-4 mb-4">
        <Card />
      </div>
      <div className="col-sm-4 mb-4">
        <Card />
      </div>
      <div className="col-sm-4 mb-4">
        <Card />
      </div>
     </div>

    </div>
  );
};
