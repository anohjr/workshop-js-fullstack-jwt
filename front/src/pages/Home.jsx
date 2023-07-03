import useStore from "../store";
import { useRef, useState } from "react";
import { updateAvatar } from "../services/users";

function Home() {
  const { auth } = useStore();
  const file = useRef();
  const [avatar, setAvatar] = useState(null);


  const handleSubmit = async () => {
    const form = new FormData();
    form.append("avatar", file.current.files[0]); // on a un seul fichier --> index 0
    try {
      const result = await updateAvatar(form);
      setAvatar(result.data?.avatar);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Bonjour {auth.user?.email}</h1>
      {avatar && <img src={avatar} alt="avatar"/>}
      <input type="file" ref={file} />
      <button onClick={handleSubmit}>Update Avatar</button>
    </>
  );
}

export default Home;
