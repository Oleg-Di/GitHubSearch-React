import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Repos } from "../components/Repos";
import { GithubContext } from "./../context/GitHub/githubContext";

export const Profile = () => {
  const { name } = useParams();
  console.log(name);
  const github = useContext(GithubContext);
  useEffect(() => {
    github.getUser(name);
    github.getRepos(name);
    // eslint-disable-next-line
  }, [name]);
  const { loading, user, repos, loadMore, reposLoading } = github;
  if (loading) {
    return <p className="text-center">Loading...</p>;
  }
  console.log(repos);
  return (
    <>
      <Link to="/" className="btn btn-primary">
        To general
      </Link>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-3 text-center">
              <img src={user.avatar_url} alt={user.avatar_url} style={{width: '150px'}}></img>
              <h1>{user.name}</h1>
              {user.location && <p>{user.location}</p>}
            </div>
            <div className="col">
              {user.bio && (
                <>
                  <h3>BIO</h3>
                  <p>{user.bio}</p>
                </>
              )}
              <a href={user.html_url} className="btn btn-dark" target="_blank"  rel="noreferrer">
                Open profile
              </a>
              <ul>
                {user.login && (
                  <li>
                    <strong>Username:</strong> {user.login}
                  </li>
                )}
                {user.company && (
                  <li>
                    <strong>Company:</strong> {user.company}
                  </li>
                )}
                {user.blog && (
                  <li>
                    <strong>Site:</strong> {user.blog}
                  </li>
                )}
              </ul>
              <div className='badge bg-primary'>Followers: {user.followers}</div>
              <div className='badge bg-success'>Follows: {user.following}</div>
              <div className='badge bg-info'>Repositiries: {user.public_repos}</div>
              <div className='badge bg-dark'>Gists: {user.public_gists}</div>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-center">Repositories:</h2>
      <Repos repos={repos}/>
      
      {reposLoading && <p className="text-center">Loading...</p>}
      <button onClick={()=>loadMore(name)} className='btn btn-primary' style={{margin: '0 auto', display: 'block'}}>Load more...</button>
    </>
  );
};
