import { useContext, useState, useRef } from "react";
import { UserContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { AuthBox } from "../components/styles/AuthBox.styled";
import Logo from "../components/AuthComponents/Logo";
import ImgMap from "../components/AuthComponents/ImgMap";
import { InputBox } from "../components/styles/InputBox.styled";
import { InputWrap } from "../components/styles/InputWrap.styled";
import { Button } from "../components/styles/Button.styled";
import { Validation } from "../components/styles/Validation.styled";

const Login = () => {
  const { login } = useContext(UserContext);

  const navigate = useNavigate();

  const [validation, setValidation] = useState("");

  const inputs = useRef([]);
  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };

  // useEffect(() =>{
  //   const registerVerification= () =>{
  //     if (currentUser){
  //       console.log("currentUser", currentUser);
  //       navigate("/register");
  //     }
  //   }
  //   return registerVerification;
  // }, []);


  const handleForm = async (e) => {
    e.preventDefault();
    console.log(inputs);
    try {
      const cred = await login(
        inputs.current[0].value,
        inputs.current[1].value
      );

      setValidation("");
      console.log(cred);
      navigate("/");
    } catch {
      setValidation("Votre mot de passe ou votre adresse email est incorrecte ")
    }
  };

  
  return (
    <AuthBox>
      <Logo />
        <InputBox onSubmit={handleForm}>
          <InputWrap 
          type="email"
          ref={addInputs}  
          />
          <InputWrap 
          type="password"
          ref={addInputs} 
          />
        <Button>Se connecter</Button>
        </InputBox>
        <Validation>{validation}</Validation>
      <ImgMap />
    </AuthBox>
  )
}

export default Login