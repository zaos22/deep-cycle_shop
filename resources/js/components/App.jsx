import react from "react";
import { createRoot } from "react-dom/client";
export default function App(){
    return(
        <>
        <h1>Hola</h1>
        </>
    )
}

if(document.getElementById('app')){
    createRoot(document.getElementById('app')).render(<App/>);
}
