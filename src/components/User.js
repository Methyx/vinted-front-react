const User = ({ photo, name }) => {
  return (
    <div>
      <img src={photo} alt="utilisateur" />
      <span>{name}</span>
    </div>
  );
};

export default User;
