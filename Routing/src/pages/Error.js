import MainNavigation from "../components/MainNavigation";
import classes from "./Root.module.css";
function ErrorPage() {
  return (
    <>
      <MainNavigation />
      <main className={classes.content}>
        <p>An error occured!</p>
        <p>Could not load this page.</p>
      </main>
    </>
  );
}

export default ErrorPage;
