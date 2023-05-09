import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../firebase/auth/AuthContextWrapper";
import { getUserProfile, User } from "../../firebase/auth/userHandler";

const ProfilePage = () => {
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [profile, setProfile] = useState<User>();
  useEffect(() => {
    const getProfile = async () => {
      const userProfile = await getUserProfile(auth as string);
      setProfile(userProfile);
    };
    getProfile();
  }, [auth]);
  return (
    <>
      <div className="flex flex-row">
        <div className="flex-grow">
          <p className="text-2xl">Your Profile</p>
          <p className="text-sm text-secondary mt-4">Update your details.</p>
        </div>
      </div>
      {/* <div className="divider"></div> */}
      <div className="flex flex-col w-full gap-4">
        {/* <div className="flex flex-row gap-4">
          <div className="pr-4 avatar border-r-2">
            <div className="w-24 rounded-full">
              {profile?.photoURL !== "" ? (
                <img src={profile?.photoURL}></img>
              ) : (
                <>No Profile</>
              )}
            </div>
          </div>
          <div>
            <p className="text-xl font-bold">Edit your profile picture!</p>
            <br></br>
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
            />
          </div>
        </div> */}
        <div className="divider"></div>
        <div className="w-full h-fit">
          <form className="w-full">
            <div className="form-control w-full">
              <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-4">
                  <div className="w-full">
                    <label className="label">
                      <span className="label-text">First Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="First Name"
                      defaultValue={profile?.firstName}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="w-full">
                    <label className="label">
                      <span className="label-text">Last Name</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={profile?.lastName}
                      placeholder="Last Name"
                      className="input input-bordered w-full"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={profile?.email}
                    placeholder="Last Name"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
            </div>
            <br></br>
            <div className="flex flex-row">
              <div className="flex-grow"></div>

              <button className="btn btn-primary" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
