import Sidebar from "../Components/sidebar";

export default function Homescreen(){
    return (
      <div className="flex flex-row">
        <div className="w-30"><Sidebar/></div>
        <div className="w-70">content</div>
      </div>
    );
}