import {BsQuestionCircleFill} from "react-icons/bs"
import { Link } from "react-router-dom"

function AbouticonLink() {
  return (
    <div className="about-link">
        <Link to="/about">
            <BsQuestionCircleFill size={50} />
        </Link>
    </div>
  )
}

export default AbouticonLink