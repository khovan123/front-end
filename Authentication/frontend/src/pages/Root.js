import {
  Outlet,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
import { useEffect } from "react";
import { getDuration } from "../util/auth";

function RootLayout() {
  // const navigation = useNavigation();
  const submit = useSubmit();
  const token = useLoaderData();
  useEffect(() => {
    if (!token) {
      return;
    }
    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
    }
    const duration = getDuration();
    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, duration);
  }, [submit, token]);
  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
