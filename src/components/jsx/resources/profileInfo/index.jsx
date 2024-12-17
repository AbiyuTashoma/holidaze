import { shallow } from "zustand/shallow";
import useUser from "../../store/user";

export default function ProfileInfo() {
  const { name, avatar } = useUser(
    (state) => ({
      name: state.name,
      avatar: state.avatar,
    }),
    shallow
  );

  return (
    <div>
      <div class="avatar-container position-relative mx-auto">
        <img src={avatar} className="avatar border rounded" alt="avatar"/>
        <button class="btn btn-outline-primary position-absolute top-100 start-100 translate-middle px-1 py-0">edit</button>
      </div>        
      <p class="my-3 text-center">{name}</p>
    </div>
  );
}