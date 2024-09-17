import Navbar from "./Navbar";
import checkAuth from "./auth/checkauth";



function Home() {
  
    const containerStyles = {
      backgroundColor: 'skyblue', // Set the background color to sky blue
      minHeight: '100vh', // Ensure the container takes the full viewport height
    };
  
    const carouselContainerStyles = {
      maxWidth: '1100px',
      margin: 'auto', // Center the carousel horizontally
    };
  
    const homeStyles = {
      color: 'blue',
      fontSize: '18px',
      margin: 'auto',
      textAlign: 'center',
      border: '5px solid red',
    };
  
    return (
      <div style={containerStyles}> {/* Apply the background color to the container */}
        <Navbar />
        <h1 style={homeStyles}>WELCOME TO KERALA WATER AUTHORITY WATER MANAGEMENT SYSTEM </h1>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="carousel-container" style={carouselContainerStyles}>
          <div id="demo" className="carousel slide" data-ride="carousel">
            <ul className="carousel-indicators">
              <li data-target="#demo" data-slide-to="0" className="active"></li>
              <li data-target="#demo" data-slide-to="1"></li>
              <li data-target="#demo" data-slide-to="2"></li>
            </ul>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="https://c4.wallpaperflare.com/wallpaper/500/289/135/water-mineral-commercial-bottle-glass-of-water-wallpaper-preview.jpg"  width="1100" height="500" alt="carousel-img1" />
              </div>
              <div className="carousel-item">
                <img src="https://t4.ftcdn.net/jpg/01/58/71/33/360_F_158713362_CcjIsJIjAUz0Mz49CDpTx93SDYlktSIv.jpg"  width="1100" height="500" alt="carousel-img2" />
              </div>
              <div className="carousel-item">
                <img src="https://wallpapers.com/images/hd/plastic-bottle-terrarium-ewugizauupam6pnc.jpg"  width="1100" height="500" alt="carousel-img3" />
              </div>
            </div>
            <a className="carousel-control-prev" href="#demo" data-slide="prev">
              <span className="carousel-control-prev-icon"></span>
            </a>
            <a className="carousel-control-next" href="#demo" data-slide="next">
              <span className="carousel-control-next-icon"></span>
            </a>
          </div>
        </div>
      </div>
    );
  }
  
  export default checkAuth(Home);
  