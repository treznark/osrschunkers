import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const MainHeader = () => {
  return (
      <header className='w-full h-10 flex flex-row items-center justify-between text-white'>
        <h1>OSRS Chunkers</h1>
        {/* <ul className='flex flex-row gap-10 items-center justify-center'>
            <li>Extreme Chunkers</li>
            <li>Vanilla/Casual Chunkers</li>
            <li>Supreme Chunkers</li>
            <li>Specialized Chunkers</li>
        </ul> */}
      </header>
  );
};

export default MainHeader;