import "./pageNotFound.css";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom"
import notFound from "../../assets/logo/notFound.png";

const PageNotFound = () => {

    const navigate = useNavigate();
    const getBackPath = () => {
        const user = auth.currentUser;

        if(user){
            navigate('/home')
        }else{
            navigate('/')
        }
    }

    return (
        <div className="page-not-found">
            <div className="page-not-found-image">
                <div className="image-background">
                    <img src={notFound} alt="Loading..." />
                </div>
            </div>
            <div className="page-not-found-text">
                <div className="status-message">
                    <h1>404!</h1>
                </div>
                <div className="message">
                    <p>The page you`re looking for can`t be found</p> 
                </div>
                <div className="return-button">
                    <button onClick={()=>{getBackPath()}}>Go Back</button>
                </div>
            </div>   
        </div>
    );
}

export default PageNotFound;