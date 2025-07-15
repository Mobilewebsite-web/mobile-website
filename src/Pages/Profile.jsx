import React from "react";
import UserData from "../components/ProfileComponents/UserData";
import UserStats from "../components/ProfileComponents/UserStats";
const Profile = () => {

  return (
<div className="p-4 pt-15">
          <UserData/>
          <UserStats/>
</div>
  );
};

export default Profile;
