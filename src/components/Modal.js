import SignUp from "./SignUp";
import Login from "./Login";

const Modal = ({ handleToken, modalVisible, setModalVisible }) => {
  document.body.style.overflow = "hidden";
  return (
    <div
      className="modal-root"
      onClick={() => {
        setModalVisible(false);
        document.body.style.overflow = "auto";
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
            document.body.style.overflow = "auto";
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
export default Modal;
