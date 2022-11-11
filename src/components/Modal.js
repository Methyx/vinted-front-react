import SignUp from "./SignUp";
import Login from "./Login";

const ModalLogin = ({ handleToken, modalVisible, setModalVisible }) => {
  return (
    <div
      className="modal-root"
      onClick={() => {
        setModalVisible(false);
      }}
    >
      <div
        className="modal"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button
          onClick={() => {
            setModalVisible(false);
          }}
        >
          X
        </button>
        <div className="modal-content">
          {modalVisible === "login" ? (
            <Login
              handleToken={handleToken}
              setModalVisible={setModalVisible}
            />
          ) : (
            modalVisible === "signup" && (
              <SignUp
                handleToken={handleToken}
                setModalVisible={setModalVisible}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};
export default ModalLogin;
