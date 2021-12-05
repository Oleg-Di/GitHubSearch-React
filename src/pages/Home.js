import { Card } from "../components/Cart";
import { Search } from "../components/Search";
import { useContext } from "react";
import { GithubContext } from "./../context/GitHub/githubContext";

export const Home = () => {
  const { loading, users } = useContext(GithubContext);
  
  return (
    <div>
      <Search />
      <div className="row">
        {loading
        ?<p className='text-center'>Loading...</p> 
        : users.map(user => {
          return (
            <div key = {user.id} className="col-sm-4 mb-4">
            <Card user={user}/>
          </div>
          )
        })}

      
      </div>
    </div>
  );
};
