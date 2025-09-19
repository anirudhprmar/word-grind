import Welcome from "./Welcome";
import WordSearchInput from "./WordSearchInput";

export default function DashboardDisplay({userId,username}:{userId:string,username:string}) {


  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 items-center justify-center max-h-full ">

          <div>
            <Welcome name={username}/>
          </div>

          <div className=" mt-10 p-2 mx-auto min-w-full lg:min-w-150">
            <WordSearchInput userId={userId }/>
          </div>

        </div>
  )
}
