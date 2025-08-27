import { useRouter } from "next/navigation";
import { authClient } from "~/lib/auth-client"; 

export const LogoutButton = () => {
  const router = useRouter()
  
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions:{
        onSuccess:()=>{
          router.push('/login')
        }
      }
    });
  };

  return (
    <button onClick={handleLogout}>
      Log out
    </button>
  );
};
