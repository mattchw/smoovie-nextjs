import { NextPageContext } from "next"
import { getSession, signOut } from "next-auth/react"

import useCurrentUser from "@/hooks/useCurrentUser";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Profile = () => {
  const { data: user } = useCurrentUser();

  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome {user?.username} ({user?.email})</p>
      <button
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Profile;