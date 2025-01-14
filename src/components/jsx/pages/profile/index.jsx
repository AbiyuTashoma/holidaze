import ProfileInfo from "../../resources/profileInfo";
import UserTab from "../../resources/tab";

/**
 * Displays the profile page
 * @returns {HTMLElement} profile page
 */
function Profile() {
  return (
    <>
      <ProfileInfo />
      <UserTab />
    </>
  );
}

export default Profile;