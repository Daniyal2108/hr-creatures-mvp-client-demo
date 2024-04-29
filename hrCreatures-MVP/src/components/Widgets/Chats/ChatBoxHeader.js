import classes from "./ChatBoxHeader.module.css";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { toggleChatSlice } from "../../../store/slices/toggleChatBox-slice";
import { useDispatch } from "react-redux";

const ChatBoxHeader = (props) => {
  const dispatch = useDispatch();
  return (
    <div
      className={`flex justify-start items-center ${classes.header} ${props.className}`}
    >
      <FaRegArrowAltCircleLeft
        className={`w-1/12 ${classes.backArrowChatBox}`}
        onClick={() => dispatch(toggleChatSlice())}
      />
      <div>
        <h2>{props.chatTitle ? props.chatTitle : "Chat Title"}</h2>
        <p>{props.chatDate ? props.chatDate : "Chat Date"}</p>
      </div>
    </div>
  );
};

export default ChatBoxHeader;
