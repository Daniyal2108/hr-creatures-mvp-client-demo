import UpdateForm from "./UpdateScreen";

const Profile = (props) => {
  return <UpdateForm getUser={props.user} />;
};

export default Profile;
