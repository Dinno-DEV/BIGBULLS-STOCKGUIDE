import './AboutUsButton.css'

function AboutUsButton({show}){
    return(
        <a href="#" className="about-us-button" onClick={show}>ABOUT <b>US</b></a>
    )
}

export default AboutUsButton