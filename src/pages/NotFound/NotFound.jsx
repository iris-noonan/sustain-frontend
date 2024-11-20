import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main>
      <section>
        <h1>404</h1>
        <Link to="/">Back to home</Link>
      </section>
    </main>
  )
}

export default NotFound