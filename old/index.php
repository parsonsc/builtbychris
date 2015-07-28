<?php
$subjectPrefix = '[Contato via Site]';
$emailTo = '<chrisparsons03@gmail.com>';

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name     = stripslashes(trim($_POST['form-name']));
    $email    = stripslashes(trim($_POST['form-email']));
    $phone    = stripslashes(trim($_POST['form-tel']));
    $subject  = stripslashes(trim($_POST['form-assunto']));
    $message  = stripslashes(trim($_POST['form-mensagem']));
    $pattern  = '/[\r\n]|Content-Type:|Bcc:|Cc:/i';

    if (preg_match($pattern, $name) || preg_match($pattern, $email) || preg_match($pattern, $subject)) {
        die("Header injection detected");
    }

    $emailIsValid = preg_match('/^[^0-9][A-z0-9._%+-]+([.][A-z0-9_]+)*[@][A-z0-9_]+([.][A-z0-9_]+)*[.][A-z]{2,4}$/', $email);

    if($name && $email && $emailIsValid && $subject && $message){
        $subject = "$subjectPrefix $subject";
        $body = "Nome: $name <br /> Email: $email <br /> Telefone: $phone <br /> Mensagem: $message";

        $headers  = 'MIME-Version: 1.1' . PHP_EOL;
        $headers .= 'Content-type: text/html; charset=utf-8' . PHP_EOL;
        $headers .= "From: $name <$email>" . PHP_EOL;
        $headers .= "Return-Path: $emailTo" . PHP_EOL;
        $headers .= "Reply-To: $email" . PHP_EOL;
        $headers .= "X-Mailer: PHP/". phpversion() . PHP_EOL;

        mail($emailTo, $subject, $body, $headers);
        $emailSent = true;

    } else {
        $hasError = true;
    }
}
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Chris Parsons - Front End Developer</title>
        <meta name="description" content="Chris is a UK based front end developer who specialised in building high end websites that are clean, effective and beautiful. I have over 3 years of experience in both studio and commercial environments and have worked with a variety of clients on projects ranging from social networks to user interfaces to full-fledged marketing campaigns.">
        <meta name="keywords" content="HTML, CSS, Jquery, JavaScript, Chris, Chris Parsons, Web Developer, Front end developer, Front end, portfolio, contact, wordpress, typo3, built by chris">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href='http://fonts.googleapis.com/css?family=Roboto:400,300,100italic,100,300italic,400italic,500' rel='stylesheet' type='text/css'>
        <script src="js/modernizr-2.6.2.min.js"></script>
        <link rel="stylesheet" href="css/builtbychris.css">
    </head>
    <body>
        <div class="la-anim-1"></div>
        <div class="site_container section" id="siteConatiner">

            <!-- SITE NAV     -->
            <nav class="site_nav fixed_top" id="site_nav">
                <div class="inner_content">
                    <a href="#siteConatiner" class="site_logo">
                        <h4>Chris Parsons</h4>
                    </a>
                    <a id="menu-icon" href="#" title="Menu" class="show_mobile">
                        <span class="line line-1"></span>
                        <span class="line line-2"></span>
                        <span class="line line-3"></span>
                    </a>

                    <ul class="site_link">
                        <li>
                            <a href="#work" class="active">
                                Work           
                            </a>
                        </li>
                        <li>
                            <a href="#about">
                               About
                            </a>
                        </li>
                        <li>
                            <a href="#contact">
                                Contact
                            </a>
                        </li>
                    </ul>
                    <ul class="social_buttons">
                        <li>
                            <a href="https://uk.linkedin.com/pub/chris-parsons/56/b9b/80a" target="_blank">
                                <i class="fa fa-linkedin"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/parsonsc" target="_blank">
                                <i class="fa fa-github"></i>
                            </a>
                        </li>
                        <!-- <li>
                            <a href="#" target="_blank">
                                <i class="fa fa-instagram"></i>
                            </a>
                        </li> -->
                    </ul>
                </div>
            </nav>
            <!-- SITE HEADER -->
            <header class="site_header">                
                <article class="hero_banner">
                    <h1 class="animated">Chris Parsons</h1>
                    <span class="role animated">Front End Developer</span>
                </article>
                <i class="fa fa-chevron-circle-down animated bounce"></i>
            </header>
            <!-- END HEADER -->
            <div class="clear"></div>

            <!-- WORK SECTION -->
            <section class="work_section" id="work">
                <div class="inner_content">
                    <h2>Work</h2>                
                    <ul class="work_grid">
                        <li>
                            <a href="french-connection.html" data-anim="la-anim-1">
                                <figure class="hover_effect fcuk">
                                    <img src="images/case_studies/fc/case_hero.jpg" alt="French Connection" width="100%" />
                                    <figcaption>
                                        <h2>French<br /><span>Connection</span></h2>
                                        <i class="fa fa-search"></i>
                                    </figcaption>           
                                </figure>
                            </a>          
                        </li>
                        <li>
                            <a href="Great-plains.html">
                                <figure class="hover_effect gp">
                                    <img src="images/work/gp.jpg" alt="Great Plains"/>
                                    <figcaption>
                                        <h2>Great<br /><span>Plains</span></h2>
                                        <i class="fa fa-search"></i>
                                    </figcaption>           
                                </figure>
                            </a>          
                        </li>
                        <li>
                            <a href="wwf.html">
                                <figure class="hover_effect wwf">
                                    <img src="images/case_studies/wwf/case_hero.png" alt="World Wildlife Foundation"/>
                                    <figcaption>
                                        <h2>WWF <span></span></h2>
                                        <i class="fa fa-search"></i>
                                    </figcaption>           
                                </figure>
                            </a>          
                        </li>
                        <li>
                            <a href="Mercy-ships.html">
                                <figure class="hover_effect mercy">
                                    <img src="images/case_studies/mercy/case_hero.jpg" alt="Mercy Ships"/>
                                    <figcaption>
                                        <h2>Mercy<br /><span>Ships</span></h2>
                                        <i class="fa fa-search"></i>
                                    </figcaption>           
                                </figure>
                            </a>          
                        </li>
                        <li>
                            <a href="Undierun.html">
                                <figure class="hover_effect undie">
                                    <img src="images/work/undie.jpg" alt="CRUK Undierun"/>
                                    <figcaption>
                                        <h2>CRUK<br /><span>Undierun</span></h2>
                                        <i class="fa fa-search"></i>
                                    </figcaption>           
                                </figure>
                            </a>          
                        </li>
                        <li>
                            <a href="Good-agency.html">
                                <figure class="hover_effect good">
                                    <img src="images/case_studies/good/case_hero.jpg" alt="Good Agency"/>
                                    <figcaption>
                                        <h2>GOOD<br /><span>Agency</span></h2>
                                        <i class="fa fa-search"></i>
                                    </figcaption>           
                                </figure>
                            </a>          
                        </li>
                        <li>
                            <a href="H2only.html">
                                <figure class="hover_effect h2only">
                                    <img src="images/case_studies/h2only/case_hero.jpg" alt="RNLI H2only"/>
                                    <figcaption>
                                        <h2>RNLI<br /><span>H2Only</span></h2>
                                        <i class="fa fa-search"></i>
                                    </figcaption>           
                                </figure>
                            </a>          
                        </li>
                        <li>
                            <a href="Alice-hart.html">
                                <figure class="hover_effect alice">
                                    <img src="images/case_studies/alice/case_hero.jpg" alt="Alice Hart Food"/>
                                    <figcaption>
                                        <h2>Alice<br /><span>Hart</span></h2>
                                        <i class="fa fa-search"></i>
                                    </figcaption>           
                                </figure>
                            </a>          
                        </li>
                        <li>
                            <a href="The-hart-and-fuggle.html">
                                <figure class="hover_effect fuggle">
                                    <img src="images/case_studies/fuggle/case_hero.jpg" alt="The Hart &amp; Fuggle"/>
                                    <figcaption>
                                        <h2>Hart &amp;<br /><span>Fuggle</span></h2>
                                        <i class="fa fa-search"></i>
                                    </figcaption>           
                                </figure>
                            </a>          
                        </li>
                        
                        <li>
                            <a href="Pip-mccormac.html">
                                <figure class="hover_effect pip">
                                    <img src="images/case_studies/pip/case_hero.jpg" alt="Pip Mccormac"/>
                                    <figcaption>
                                        <h2>Pip<br /><span>Mccormac</span></h2>
                                        <i class="fa fa-search"></i>
                                    </figcaption>           
                                </figure>
                            </a>          
                        </li>                        
                    </ul>             
                </div>                
            </section>
            <div class="clear"></div>

            <section class="about" id="about">
                <div class="inner_content">
                    <h2>About</h2>
                    <p>I'm Chris, a UK-based, front end developer with over 3 years of experience in both studio and commercial environments. I specialise in building high-end websites that are clean, effective and beautiful and have worked with a wide variety of clients on projects ranging from social networks to user interfaces to fully-fledged marketing campaigns.</p>
                </div>
            </section>
            <div class="clear"></div>

            <section class="contact" id="contact">
                <div class="inner_content">
                    <aside>
                        <h2>Contact</h2>
                        <ul>
                            <li>
                                <a href="#" target="_blank">
                                    <i class="fa fa-linkedin"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#" target="_blank">
                                    <i class="fa fa-github"></i>
                                </a>
                            </li>
                        </ul>
                        <p>I'm Avalible For Freelance Work. I Want To Hear About Your Project. <a href="mailto:hello@builtbychris.com" target="_blank">hello@builtbychris.com</a></p>                        
                    </aside>
                    <?php if(!empty($emailSent)): ?>
                        <div class="col-md-6 col-md-offset-3">
                            <div class="alert alert-success text-center">
                                Thanks for the message. I will replay as soon as possible.
                            </div>
                        </div>
                    <?php else: ?>
                        <?php if(!empty($hasError)): ?>
                        <div class="col-md-5 col-md-offset-4">
                            <div class="alert alert-danger text-center">Something went wrong...</div>
                        </div>
                        <?php endif; ?>

                        <div class="col-md-6 col-md-offset-3">
                            <form action="<?php echo $_SERVER['REQUEST_URI']; ?>" id="contact-form" class="form-horizontal" role="form" method="post">
                                <div class="form-group">
                                    <label for="name" class="col-lg-2 control-label">Name *</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" id="form-name" name="form-name" placeholder="Name *" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="email" class="col-lg-2 control-label">Email</label>
                                    <div class="col-lg-10">
                                        <input type="email" class="form-control" id="form-email" name="form-email" placeholder="Email" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="tel" class="col-lg-2 control-label">Number *</label>
                                    <div class="col-lg-10">
                                        <input type="tel" class="form-control" id="form-tel" name="form-tel" placeholder="Number *">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="assunto" class="col-lg-2 control-label">Subject</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" id="form-assunto" name="form-assunto" placeholder="Subject" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="mensagem" class="col-lg-2 control-label">Message</label>
                                    <div class="col-lg-10">
                                        <textarea class="form-control" rows="3" id="form-mensagem" name="form-mensagem" placeholder="Message" required></textarea>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-offset-2 col-lg-10">
                                        <button type="submit" class="btn btn-default send_button"><i class="fa fa-paper-plane"></i></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <?php endif; ?>
                    </div>
                </section>
                <div class="clear"></div>

                <footer class="site_footer" id="siteFooter">
                    <div class="inner_content">
                    <p>&copy; Builtbychris 2015</p>
                    </div>
                </footer>
            </div>
            <script src="js/jquery.js"></script>
            <script type="text/javascript" src="js/contact.js"></script>            
            <script src="js/main.js"></script>
            <script src="js/jquery.waypoints.min.js"></script>
            <script src="js/classie.js"></script>
        
        <script>  
            var loader = document.getElementById('la-anim-6-loader')
                , border = document.getElementById('la-anim-6-border')
                , α = 0
                , π = Math.PI
                , t = 15
                
                , tdraw;

            function PieDraw() {
                α++;
                α %= 360;
                var r = ( α * π / 180 )
                , x = Math.sin( r ) * 250
                , y = Math.cos( r ) * - 250
                , mid = ( α > 180 ) ? 1 : 0
                , anim = 'M 0 0 v -250 A 250 250 1 ' 
                       + mid + ' 1 ' 
                       +  x  + ' ' 
                       +  y  + ' z';

                loader.setAttribute( 'd', anim );
                border.setAttribute( 'd', anim );
                if( α != 0 )
                tdraw = setTimeout(PieDraw, t); // Redraw
            }

            function PieReset() {
                clearTimeout(tdraw);
                var anim = 'M 0 0 v -250 A 250 250 1 0 1 0 -250 z';
                loader.setAttribute( 'd', anim );
                border.setAttribute( 'd', anim );
            }

            var inProgress = false;

            Array.prototype.slice.call( document.querySelectorAll( '#la-buttons > button' ) ).forEach( function( el, i ) {
                var anim = el.getAttribute( 'data-anim' ),
                    animEl = document.querySelector( '.' + anim );

                el.addEventListener( 'click', function() {
                    if( inProgress ) return false;
                    inProgress = true;
                    classie.add( animEl, 'la-animate' );

                    if( anim === 'la-anim-6' ) {
                        PieDraw();
                    }

                    setTimeout( function() {
                        classie.remove( animEl, 'la-animate' );
                        
                        if( anim === 'la-anim-6' ) {
                            PieReset();
                        }
                        
                        inProgress = false;
                    }, 6000 );
                } );
            } );           

            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-56170273-1', 'auto');
            ga('send', 'pageview');
        </script>     
    </body>
</html>