import styled from "styled-components";

export default styled.button<{disable: boolean}>`
display: ${({ disable }) => disable ? 'none' : 'flex'};
align-items: center;
justify-content: center;
font-size: 25px;
height: 50px;
margin: 0px 10px;
border-radius: 10px;
border: 1px solid #202124;
background-color: #ffffff;
padding: 0 10px;

&:hover {
    background-color: #202124;
    color: #ffffff;
}
`