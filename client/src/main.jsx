import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Button } from "flowbite-react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <h1 className="text-3xl font-bold underline text-center">Hello world!</h1>
    <Button className="py-5 mt-5">Click me</Button>;
  </StrictMode>
);
