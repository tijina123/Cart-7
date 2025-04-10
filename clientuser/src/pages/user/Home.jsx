import { useEffect, useState } from 'react';
import $ from "jquery";  // Import jQuery
import "owl.carousel/dist/assets/owl.carousel.css";  // Owl Carousel CSS
import "owl.carousel";  // Owl Carousel JS
import ProductCarousel from './ProductCarousel';
import UserService from "../../services/user-api-services/UserService";
import { Link } from 'react-router-dom';



const Home = () => {
  const { getHomeProductsByCategory, getHomeProducts } = UserService()

  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [bannerImage, setBannerImage] = useState([]);


  useEffect(() => {
    getProductsByCategory();
    getProducts();
  }, []);

  const getProductsByCategory = async () => {
    try {
      const response = await getHomeProductsByCategory();
      console.log(response?.productsByCategory, "============response?.productsByCategory");

      setAllProducts(response?.productsByCategory);

    } catch (error) {

    }

  }
  const getProducts = async () => {
    try {
      const response = await getHomeProducts();
      response?.products?.reverse()
      setProducts(response?.products);

    } catch (error) {

    }

  }




  return (
    <div className="page-wrapper">
      <main className="main">
        <div className="intro-slider-container" >
          <div className="intro-slider owl-carousel owl-simple owl-nav-inside" data-toggle="owl" data-owl-options="{
                  &quot;nav&quot;: false,
                  &quot;responsive&quot;: {
                      &quot;992&quot;: {
                          &quot;nav&quot;: true
                      }
                  }
              }">
            <div className="intro-slide" style={{ backgroundImage: 'url(assets/images/demos/demo-13/slider/slider-1.jpeg)'}}>
              <div className="container intro-content">
                <div className="row">
                  <div className="col-auto offset-lg-3 intro-col">
                    {/* <h3 className="intro-subtitle">Trade-In Offer</h3>
                    <h1 className="intro-title">MacBook Air <br />Latest Model
                      <span>
                        <sup className="font-weight-light">from</sup>
                        <span className="text-primary">$999<sup>,99</sup></span>
                      </span>
                    </h1> */}
                    {/* <a href="category.html" className="btn btn-outline-primary-2">
                      <span>Shop Now</span>
                      <i className="icon-long-arrow-right" />
                    </a> */}
                  </div>{/* End .col-auto offset-lg-3 */}
                </div>{/* End .row */}
              </div>{/* End .container intro-content */}
            </div>{/* End .intro-slide */}
            <div className="intro-slide" style={{ backgroundImage: 'url(assets/images/demos/demo-13/slider/slider-2.jpeg)', objectFit: 'contain' }}>
              <div className="container intro-content">
                <div className="row">
                  <div className="col-auto offset-lg-3 intro-col">
                   
                  </div>{/* End .col-auto offset-lg-3 */}
                </div>{/* End .row */}
              </div>{/* End .container intro-content */}
            </div>{/* End .intro-slide */}
            <div className="intro-slide" style={{ backgroundImage: 'url(assets/images/demos/demo-13/slider/slider-3.jpeg)', objectFit: 'contain' }}>
              <div className="container intro-content">
                <div className="row">
                  <div className="col-auto offset-lg-3 intro-col">
                   
                  </div>{/* End .col-auto offset-lg-3 */}
                </div>{/* End .row */}
              </div>{/* End .container intro-content */}
            </div>{/* End .intro-slide */}
          </div>{/* End .owl-carousel owl-simple */}
          <span className="slider-loader" />{/* End .slider-loader */}
        </div>{/* End .intro-slider-container */}
        <div className="mb-4" />{/* End .mb-2 */}
        <div className="container">
          <h2 className="title text-center mb-2">Explore Popular Categories</h2>{/* End .title */}
          <div className="cat-blocks-container">
            <div className="row">
              <div className="col-6 col-sm-4 col-lg-2">
                <Link to="/" className="cat-block">
                  <figure>
                    <span>
                      <img src="assets/images/demos/demo-13/cats/1.jpg" alt="Category image" />
                    </span>
                  </figure>
                  <h3 className="cat-block-title">Computer &amp; Laptop</h3>{/* End .cat-block-title */}
               </Link>
              </div>{/* End .col-sm-4 col-lg-2 */}
              <div className="col-6 col-sm-4 col-lg-2">
                <Link t0="/"className="cat-block">
                  <figure>
                    <span>
                      <img src="assets/images/demos/demo-13/cats/2.jpg" alt="Category image" />
                    </span>
                  </figure>
                  <h3 className="cat-block-title">Lighting</h3>{/* End .cat-block-title */}
                </Link>
              </div>{/* End .col-sm-4 col-lg-2 */}
              <div className="col-6 col-sm-4 col-lg-2">
                <Link to="/" className="cat-block">
                  <figure>
                    <span>
                      <img src="assets/images/demos/demo-13/cats/3.jpg" alt="Category image" />
                    </span>
                  </figure>
                  <h3 className="cat-block-title">Smart Phones</h3>{/* End .cat-block-title */}
               </Link>
              </div>{/* End .col-sm-4 col-lg-2 */}
              <div className="col-6 col-sm-4 col-lg-2">
              <Link to="/"  className="cat-block">
                  <figure>
                    <span>
                      <img src="assets/images/demos/demo-13/cats/4.jpg" alt="Category image" />
                    </span>
                  </figure>
                  <h3 className="cat-block-title">Televisions</h3>{/* End .cat-block-title */}
                  </Link>
              </div>{/* End .col-sm-4 col-lg-2 */}
              <div className="col-6 col-sm-4 col-lg-2">
              <Link to="/" className="cat-block">
                  <figure>
                    <span>
                      <img src="assets/images/demos/demo-13/cats/5.jpg" alt="Category image" />
                    </span>
                  </figure>
                  <h3 className="cat-block-title">Cooking</h3>{/* End .cat-block-title */}
                  </Link>
              </div>{/* End .col-sm-4 col-lg-2 */}
              <div className="col-6 col-sm-4 col-lg-2">
              <Link to="/" className="cat-block">
                  <figure>
                    <span>
                      <img src="assets/images/demos/demo-13/cats/6.jpg" alt="Category image" />
                    </span>
                  </figure>
                  <h3 className="cat-block-title">Furniture</h3>{/* End .cat-block-title */}
                  </Link>
              </div>{/* End .col-sm-4 col-lg-2 */}
            </div>{/* End .row */}
          </div>{/* End .cat-blocks-container */}
        </div>{/* End .container */}
        <div className="mb-2" />{/* End .mb-2 */}
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-lg-3">
              <div className="banner banner-overlay">
                <a href="#">
                  <img src="assets/images/demos/demo-13/banners/banner-1.jpg" alt="Banner" />
                </a>
                <div className="banner-content">
                  <h4 className="banner-subtitle text-white"><a href="#">Weekend Sale</a></h4>{/* End .banner-subtitle */}
                  <h3 className="banner-title text-white"><a href="#">Lighting <br />&amp; Accessories <br /><span>25% off</span></a></h3>{/* End .banner-title */}
                  <a href="#" className="banner-link">Shop Now <i className="icon-long-arrow-right" /></a>
                </div>{/* End .banner-content */}
              </div>{/* End .banner */}
            </div>{/* End .col-lg-3 */}
            <div className="col-sm-6 col-lg-3 order-lg-last">
              <div className="banner banner-overlay">
                <a href="#">
                  <img src="assets/images/demos/demo-13/banners/banner-3.jpg" alt="Banner" />
                </a>
                <div className="banner-content">
                  <h4 className="banner-subtitle text-white"><a href="#">Smart Offer</a></h4>{/* End .banner-subtitle */}
                  <h3 className="banner-title text-white"><a href="#">Anniversary <br />Special <br /><span>15% off</span></a></h3>{/* End .banner-title */}
                  <a href="#" className="banner-link">Shop Now <i className="icon-long-arrow-right" /></a>
                </div>{/* End .banner-content */}
              </div>{/* End .banner */}
            </div>{/* End .col-lg-3 */}
            <div className="col-lg-6">
              <div className="banner banner-overlay">
                <a href="#">
                  <img src="assets/images/demos/demo-13/banners/banner-2.jpg" alt="Banner" />
                </a>
                <div className="banner-content">
                  <h4 className="banner-subtitle text-white d-none d-sm-block"><a href="#">Amazing Value</a></h4>{/* End .banner-subtitle */}
                  <h3 className="banner-title text-white"><a href="#">Clothes Trending <br />Spring Collection 2019 <br /><span>from $12,99</span></a></h3>{/* End .banner-title */}
                  <a href="#" className="banner-link">Discover Now <i className="icon-long-arrow-right" /></a>
                </div>{/* End .banner-content */}
              </div>{/* End .banner */}
            </div>{/* End .col-lg-6 */}
          </div>{/* End .row */}
        </div>{/* End .container */}
        <div className="mb-3 filter-products" />{/* End .mb-3 */}
        <div className="bg-light pt-3 pb-5 " >

          {/* ****************** show products ****************** */}
          <div className="container" >
            <div className="heading heading-flex heading-border mb-3">
              <div className="heading-left">
                <h2 className="title">All products</h2>{/* End .title */}
              </div>{/* End .heading-left */}
              <div className="heading-right">
                <ul className="nav nav-pills nav-border-anim justify-content-center" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" id="hot-all-link" data-toggle="tab" href="#hot-all-tab" role="tab" aria-controls="hot-all-tab" aria-selected="true">All</a>
                  </li>
                </ul>
              </div>{/* End .heading-right */}
            </div>{/* End .heading */}
            <div className="tab-content tab-content-carousel">
              <div className="tab-pane p-0 fade show active" id="hot-all-tab" role="tabpanel" aria-labelledby="hot-all-link">
                <ProductCarousel products={products} />
              </div>{/* .End .tab-pane */}

            </div>{/* End .tab-content */}
          </div>

          {/* ****************** show products by category ****************** */}

          {allProducts?.map((products) => {

          if(products.products.length > 0){

           return <div className="container" key={products._id}>
              <div className="heading heading-flex heading-border mb-3">
                <div className="heading-left">
                  <h2 className="title">{products.name}</h2>{/* End .title */}
                </div>{/* End .heading-left */}
                <div className="heading-right">
                  <ul className="nav nav-pills nav-border-anim justify-content-center" role="tablist">
                    <li className="nav-item">
                      <a className="nav-link active" id="hot-all-link" data-toggle="tab" href="#hot-all-tab" role="tab" aria-controls="hot-all-tab" aria-selected="true">All</a>
                    </li>
                  </ul>
                </div>{/* End .heading-right */}
              </div>{/* End .heading */}
              <div className="tab-content tab-content-carousel">
                <div className="tab-pane p-0 fade show active" id="hot-all-tab" role="tabpanel" aria-labelledby="hot-all-link">
                  <ProductCarousel products={products.products} />
                </div>{/* .End .tab-pane */}

              </div>{/* End .tab-content */}
            </div>

}})}





        </div>{/* End .bg-light pt-5 pb-5 */}
        <div className="mb-3" />{/* End .mb-3 */}

        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="banner banner-overlay banner-overlay-light">
                <a href="#">
                  <img src="assets/images/demos/demo-13/banners/banner-4.jpg" alt="Banner" />
                </a>
                <div className="banner-content">
                  <h4 className="banner-subtitle d-none d-sm-block"><a href="#">Spring Sale is Coming</a></h4>{/* End .banner-subtitle */}
                  <h3 className="banner-title"><a href="#">All Smart Watches <br />Discount <br /><span className="text-primary">15% off</span></a></h3>{/* End .banner-title */}
                  <a href="#" className="banner-link banner-link-dark">Discover Now <i className="icon-long-arrow-right" /></a>
                </div>{/* End .banner-content */}
              </div>{/* End .banner */}
            </div>{/* End .col-lg-6 */}
            <div className="col-lg-6">
              <div className="banner banner-overlay">
                <a href="#">
                  <img src="assets/images/demos/demo-13/banners/banner-5.png" alt="Banner" />
                </a>
                <div className="banner-content">
                  <h4 className="banner-subtitle text-white  d-none d-sm-block"><a href="#">Amazing Value</a></h4>{/* End .banner-subtitle */}
                  <h3 className="banner-title text-white"><a href="#">Headphones Trending <br />JBL Harman <br /><span>from $59,99</span></a></h3>{/* End .banner-title */}
                  <a href="#" className="banner-link">Discover Now <i className="icon-long-arrow-right" /></a>
                </div>{/* End .banner-content */}
              </div>{/* End .banner */}
            </div>{/* End .col-lg-6 */}
          </div>{/* End .row */}
        </div>{/* End .container */}

        <div className="mb-1" />{/* End .mb-1 */}

        <div className="mb-3" />{/* End .mb-3 */}
        {/* *********************** */}

        <div className="mb-3" />{/* End .mb-3 */}
       

        
      </main>
    </div>
  )
}

export default Home