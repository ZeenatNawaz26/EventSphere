import React from 'react'
import Header from '../Components/navbar/Header'

const Home = () => {
    return (
        <>
 
           
            <section id="about">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <h2>About The Event</h2>
                            <p>Sed nam ut dolor qui repellendus iusto odit. Possimus inventore eveniet accusamus error amet eius aut
                                accusantium et. Non odit consequatur repudiandae sequi ea odio molestiae. Enim possimus sunt inventore in
                                est ut optio sequi unde.</p>
                        </div>
                        <div className="col-lg-3">
                            <h3>Where</h3>
                            <p>Downtown Conference Center, New York</p>
                        </div>
                        <div className="col-lg-3">
                            <h3>When</h3>
                            <p>Monday to Wednesday<br />10-12 December</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="gallery" className="wow fadeInUp">

                <div className="container">
                    <div className="section-header">
                        <h2>Gallery</h2>
                        <p>Check our gallery from the recent events</p>
                    </div>
                </div>

                <div className="owl-carousel gallery-carousel">
                    <a href="img/gallery/1.jpg" className="venobox" data-gall="gallery-carousel"><img src="img/gallery/1.jpg" alt="" /></a>
                    <a href="img/gallery/2.jpg" className="venobox" data-gall="gallery-carousel"><img src="img/gallery/2.jpg" alt="" /></a>
                    <a href="img/gallery/3.jpg" className="venobox" data-gall="gallery-carousel"><img src="img/gallery/3.jpg" alt="" /></a>
                    <a href="img/gallery/4.jpg" className="venobox" data-gall="gallery-carousel"><img src="img/gallery/4.jpg" alt="" /></a>
                    <a href="img/gallery/5.jpg" className="venobox" data-gall="gallery-carousel"><img src="img/gallery/5.jpg" alt="" /></a>
                    <a href="img/gallery/6.jpg" className="venobox" data-gall="gallery-carousel"><img src="img/gallery/6.jpg" alt="" /></a>
                    <a href="img/gallery/7.jpg" className="venobox" data-gall="gallery-carousel"><img src="img/gallery/7.jpg" alt="" /></a>
                    <a href="img/gallery/8.jpg" className="venobox" data-gall="gallery-carousel"><img src="img/gallery/8.jpg" alt="" /></a>
                </div>

            </section>

            <section id="sponsors" className="section-with-bg wow fadeInUp">

                <div className="container">
                    <div className="section-header">
                        <h2>Sponsors</h2>
                    </div>

                    <div className="row no-gutters sponsors-wrap clearfix">

                        <div className="col-lg-3 col-md-4 col-xs-6">
                            <div className="sponsor-logo">
                                <img src="img/sponsors/1.png" className="img-fluid" alt="" />
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-4 col-xs-6">
                            <div className="sponsor-logo">
                                <img src="img/sponsors/2.png" className="img-fluid" alt="" />
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-4 col-xs-6">
                            <div className="sponsor-logo">
                                <img src="img/sponsors/3.png" className="img-fluid" alt="" />
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-4 col-xs-6">
                            <div className="sponsor-logo">
                                <img src="img/sponsors/4.png" className="img-fluid" alt="" />
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-4 col-xs-6">
                            <div className="sponsor-logo">
                                <img src="img/sponsors/5.png" className="img-fluid" alt="" />
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-4 col-xs-6">
                            <div className="sponsor-logo">
                                <img src="img/sponsors/6.png" className="img-fluid" alt="" />
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-4 col-xs-6">
                            <div className="sponsor-logo">
                                <img src="img/sponsors/7.png" className="img-fluid" alt="" />
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-4 col-xs-6">
                            <div className="sponsor-logo">
                                <img src="img/sponsors/8.png" className="img-fluid" alt="" />
                            </div>
                        </div>

                    </div>

                </div>

            </section>


            <section id="faq" className="wow fadeInUp">

                <div className="container">

                    <div className="section-header">
                        <h2>F.A.Q </h2>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-lg-9">
                            <ul id="faq-list">

                                <li>
                                    <a data-toggle="collapse" className="collapsed" href="#faq1">Non consectetur a erat nam at lectus urna duis? <i className="fa fa-minus-circle"></i></a>
                                    <div id="faq1" className="collapse" data-parent="#faq-list">
                                        <p>
                                            Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non.
                                        </p>
                                    </div>
                                </li>

                                <li>
                                    <a data-toggle="collapse" href="#faq2" className="collapsed">Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque? <i className="fa fa-minus-circle"></i></a>
                                    <div id="faq2" className="collapse" data-parent="#faq-list">
                                        <p>
                                            Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.
                                        </p>
                                    </div>
                                </li>

                                <li>
                                    <a data-toggle="collapse" href="#faq3" className="collapsed">Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi? <i className="fa fa-minus-circle"></i></a>
                                    <div id="faq3" className="collapse" data-parent="#faq-list">
                                        <p>
                                            Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Faucibus pulvinar elementum integer enim. Sem nulla pharetra diam sit amet nisl suscipit. Rutrum tellus pellentesque eu tincidunt. Lectus urna duis convallis convallis tellus. Urna molestie at elementum eu facilisis sed odio morbi quis
                                        </p>
                                    </div>
                                </li>

                                <li>
                                    <a data-toggle="collapse" href="#faq4" className="collapsed">Ac odio tempor orci dapibus. Aliquam eleifend mi in nulla? <i className="fa fa-minus-circle"></i></a>
                                    <div id="faq4" className="collapse" data-parent="#faq-list">
                                        <p>
                                            Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.
                                        </p>
                                    </div>
                                </li>

                                <li>
                                    <a data-toggle="collapse" href="#faq5" className="collapsed">Tempus quam pellentesque nec nam aliquam sem et tortor consequat? <i className="fa fa-minus-circle"></i></a>
                                    <div id="faq5" className="collapse" data-parent="#faq-list">
                                        <p>
                                            Molestie a iaculis at erat pellentesque adipiscing commodo. Dignissim suspendisse in est ante in. Nunc vel risus commodo viverra maecenas accumsan. Sit amet nisl suscipit adipiscing bibendum est. Purus gravida quis blandit turpis cursus in
                                        </p>
                                    </div>
                                </li>

                                <li>
                                    <a data-toggle="collapse" href="#faq6" className="collapsed">Tortor vitae purus faucibus ornare. Varius vel pharetra vel turpis nunc eget lorem dolor? <i className="fa fa-minus-circle"></i></a>
                                    <div id="faq6" className="collapse" data-parent="#faq-list">
                                        <p>
                                            Laoreet sit amet cursus sit amet dictum sit amet justo. Mauris vitae ultricies leo integer malesuada nunc vel. Tincidunt eget nullam non nisi est sit amet. Turpis nunc eget lorem dolor sed. Ut venenatis tellus in metus vulputate eu scelerisque. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus. Nibh tellus molestie nunc non blandit massa enim nec.
                                        </p>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>

                </div>

            </section>


            <section id="subscribe">
                <div className="container wow fadeInUp">
                    <div className="section-header">
                        <h2>Newsletter</h2>
                        <p>Rerum numquam illum recusandae quia mollitia consequatur.</p>
                    </div>

                    <form method="POST" action="#">
                        <div className="form-row justify-content-center">
                            <div className="col-auto">
                                <input type="text" className="form-control" placeholder="Enter your Email" />
                            </div>
                            <div className="col-auto">
                                <button type="submit">Subscribe</button>
                            </div>
                        </div>
                    </form>

                </div>
            </section>


            <section id="buy-tickets" className="section-with-bg wow fadeInUp">
                <div className="container">

                    <div className="section-header">
                        <h2>Buy Tickets</h2>
                        <p>Velit consequatur consequatur inventore iste fugit unde omnis eum aut.</p>
                    </div>

                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card mb-5 mb-lg-0">
                                <div className="card-body">
                                    <h5 className="card-title text-muted text-uppercase text-center">Standard Access</h5>
                                    <h6 className="card-price text-center">$150</h6>
                                    <hr />
                                    <ul className="fa-ul">
                                        <li><span className="fa-li"><i className="fa fa-check"></i></span>Regular Seating</li>
                                        <li><span className="fa-li"><i className="fa fa-check"></i></span>Coffee Break</li>
                                        <li><span className="fa-li"><i className="fa fa-check"></i></span>Custom Badge</li>
                                        <li className="text-muted"><span className="fa-li"><i className="fa fa-times"></i></span>Community Access</li>
                                        <li className="text-muted"><span className="fa-li"><i className="fa fa-times"></i></span>Workshop Access</li>
                                        <li className="text-muted"><span className="fa-li"><i className="fa fa-times"></i></span>After Party</li>
                                    </ul>
                                    <hr />
                                    <div className="text-center">
                                        <button type="button" className="btn" data-toggle="modal" data-target="#buy-ticket-modal" data-ticket-type="standard-access">Buy Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="card mb-5 mb-lg-0">
                                <div className="card-body">
                                    <h5 className="card-title text-muted text-uppercase text-center">Pro Access</h5>
                                    <h6 className="card-price text-center">$250</h6>
                                    <hr />
                                    <ul className="fa-ul">
                                        <li><span className="fa-li"><i className="fa fa-check"></i></span>Regular Seating</li>
                                        <li><span className="fa-li"><i className="fa fa-check"></i></span>Coffee Break</li>
                                        <li><span className="fa-li"><i className="fa fa-check"></i></span>Custom Badge</li>
                                        <li><span className="fa-li"><i className="fa fa-check"></i></span>Community Access</li>
                                        <li className="text-muted"><span className="fa-li"><i className="fa fa-times"></i></span>Workshop Access</li>
                                        <li className="text-muted"><span className="fa-li"><i className="fa fa-times"></i></span>After Party</li>
                                    </ul>
                                    <hr />
                                    <div className="text-center">
                                        <button type="button" className="btn" data-toggle="modal" data-target="#buy-ticket-modal" data-ticket-type="pro-access">Buy Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title text-muted text-uppercase text-center">Premium Access</h5>
                                    <h6 className="card-price text-center">$350</h6>
                                    <hr />
                                    <ul className="fa-ul">
                                        <li><span className="fa-li"><i className="fa fa-check"></i></span>Regular Seating</li>
                                        <li><span className="fa-li"><i className="fa fa-check"></i></span>Coffee Break</li>
                                        <li><span className="fa-li"><i className="fa fa-check"></i></span>Custom Badge</li>
                                        <li><span className="fa-li"><i className="fa fa-check"></i></span>Community Access</li>
                                        <li><span className="fa-li"><i className="fa fa-check"></i></span>Workshop Access</li>
                                        <li><span className="fa-li"><i className="fa fa-check"></i></span>After Party</li>
                                    </ul>
                                    <hr />
                                    <div className="text-center">
                                        <button type="button" className="btn" data-toggle="modal" data-target="#buy-ticket-modal" data-ticket-type="premium-access">Buy Now</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div id="buy-ticket-modal" className="modal fade">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Buy Tickets</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form method="POST" action="#">
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="your-name" placeholder="Your Name" />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="your-email" placeholder="Your Email" />
                                    </div>
                                    <div className="form-group">
                                        <select id="ticket-type" name="ticket-type" className="form-control" >
                                            <option value="">-- Select Your Ticket Type --</option>
                                            <option value="standard-access">Standard Access</option>
                                            <option value="pro-access">Pro Access</option>
                                            <option value="premium-access">Premium Access</option>
                                        </select>
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn">Buy Now</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </section>


            <section id="contact" className="section-bg wow fadeInUp">

                <div className="container">

                    <div className="section-header">
                        <h2>Contact Us</h2>
                        <p>Nihil officia ut sint molestiae tenetur.</p>
                    </div>

                    <div className="row contact-info">

                        <div className="col-md-4">
                            <div className="contact-address">
                                <i className="ion-ios-location-outline"></i>
                                <h3>Address</h3>
                                <address>A108 Adam Street, NY 535022, USA</address>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="contact-phone">
                                <i className="ion-ios-telephone-outline"></i>
                                <h3>Phone Number</h3>
                                <p><a href="tel:+155895548855">+1 5589 55488 55</a></p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="contact-email">
                                <i className="ion-ios-email-outline"></i>
                                <h3>Email</h3>
                                <p><a href="mailto:info@example.com">info@example.com</a></p>
                            </div>
                        </div>

                    </div>

                    <div className="form">
                        <div id="sendmessage">Your message has been sent. Thank you!</div>
                        <div id="errormessage"></div>
                        <form action="" method="post" role="form" className="contactForm">
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                                    <div className="validation"></div>
                                </div>
                                <div className="form-group col-md-6">
                                    <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
                                    <div className="validation"></div>
                                </div>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
                                <div className="validation"></div>
                            </div>
                            <div className="form-group">
                                <textarea className="form-control" name="message" rows="5" data-rule="required" data-msg="Please write something for us" placeholder="Message"></textarea>
                                <div className="validation"></div>
                            </div>
                            <div className="text-center"><button type="submit">Send Message</button></div>
                        </form>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Home
