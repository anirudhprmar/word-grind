import { authClient } from "~/lib/auth-client"; 

export const LogoutButton = () => {

  const handleLogout = async () => {
    await authClient.signOut();
  };

  return (
    <button onClick={handleLogout}>
      Log out
    </button>
  );
};
