import { createRoot } from 'react-dom/client';
import { MainView } from "./components/main-view/main-view";
import "./index.scss";
import Container from "react-bootstrap/Container";
import { BrowserRouter } from "react-router-dom";


const MyFlixApplication = () => {
  return (
    <Container className="pb-4">
      <BrowserRouter>
        <MainView />
      </BrowserRouter>
    </Container>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<MyFlixApplication />);