const { useEffect } = require("react")
const { useSelector } = require("react-redux");
const { useNavigate } = require("react-router-dom");

const ProtectedRoute = ({Children}) =>{
    const {user} = useSelector(store => store.auth);
    const navigate =useNavigate();

    useEffect(()=>{
if(user==null || user.role !== 'recruiter' ){
    navigate("/");
}
    },[]);
    <>
    {Children}
    </>

};
export default ProtectedRoute
