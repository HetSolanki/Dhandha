/* eslint-disable no-unused-vars */
import { useCookies } from "react-cookie";

const Home = () => {
  const [cookies] = useCookies(["token"]);
  return <div>Welcome {cookies.token}</div>;
};

export default Home;
