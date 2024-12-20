import { IoReorderThreeOutline } from "react-icons/io5";
import { IoMdExit } from "react-icons/io";
// import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation'; 

type HeaderProps = {
  openSidebar: boolean;
  onChangeOpenSidebar: () => void;
};

export default  function Header(props: HeaderProps) {
  const { openSidebar, onChangeOpenSidebar } = props;
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      // Fazendo uma requisição para a API de logout
      const response = await fetch('/api/auth/logout', {
        method: 'GET',
      });

      if (response.ok) {
        // Redireciona para a página de login após o logout
        router.push('/login');
      } else {
        console.error('Erro ao fazer logout');
      }
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }
  return (
    <header
      className={`${
        openSidebar ? "w-[calc(100%-230px)]" : "w-full "
      } h-16 bg-[#284557] flex items-center justify-between px-4 ml-auto fixed right-0 z-[99999]`}
    >
      <IoReorderThreeOutline
        className="text-white cursor-pointer"
        size={30}
        onClick={onChangeOpenSidebar}
      />

      <div className="flex items-center gap-4">
        <div
          className="text-white flex items-center text-lg gap-2 hover:opacity-75 transition-all cursor-pointer"
          onClick={() => handleSignOut()}
        >
          Sair
          <IoMdExit />
        </div>
      </div>
    </header>
  );
}
