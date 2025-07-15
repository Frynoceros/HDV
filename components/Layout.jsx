import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout({children}) {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div>{children}</div>
      {/* <Footer /> */}
    </div>
  );
}
