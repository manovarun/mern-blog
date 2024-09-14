import { useSelector } from 'react-redux';

function Home() {
  const { currentUser } = useSelector((state) => state.user);
  return <div>Home {currentUser && currentUser.user.username}</div>;
}

export default Home;
