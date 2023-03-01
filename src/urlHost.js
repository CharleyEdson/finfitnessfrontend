export const URL_HOST =
  process.env.NODE_ENV === "production"
    ? "https://cors-anywhere.herokuapp.com/http://finfitnessbackend-env.eba-55w3f9b3.us-west-1.elasticbeanstalk.com"
    : "http://127.0.0.1:8000";
