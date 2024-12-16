import { Button } from "@/components/ui/button";
import React from "react";
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div className="space-y-8">
      <h1 className="text-8xl font-bold">Oops ...</h1>

      {isRouteErrorResponse(error) ? (
        <div>
          <p className="text-2xl font-medium mb-2">Route Not Found</p>
          <p>
            We couldn’t find the page you were looking for. This could be due to
            a mistyped URL, an outdated link, or the page may have been moved or
            deleted.
          </p>
        </div>
      ) : (
        <p className="text-2xl font-medium ">Unexpected Error</p>
      )}

      <Button
        onClick={() => {
          navigate("/");
        }}
      >
        Go to homepage
      </Button>
    </div>
  );
};

export default ErrorPage;
