import React from "react";
import { Link } from "react-router-dom";

const ErrorPage: React.FC = () => (
  <div>
    <div>Page not found</div>
    <Link to="/">
      Go to main
    </Link>
  </div>
);

export default ErrorPage;
