import { Link } from 'react-router-dom'


const ErrorPage = () => {
   return (
    <div className='oopss'>
      <div className='error-text'>
          <img src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg" alt="404"/>
          <h2>404 PAGE</h2>
          <p>. The page you were looking for could not be found</p>
          <Link to={`/`}>
          <button class="back">... Go Back!</button>
          </Link>
      </div>
    </div>
   )
}


export default ErrorPage;