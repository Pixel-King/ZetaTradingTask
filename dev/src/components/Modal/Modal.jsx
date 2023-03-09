import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddNodeMutation,
  useDeleteNodeMutation,
  useRenameNodeMutation,
} from "../../app/swagger/swagger.api";
import { selectSwitch, setModal } from "../Node/switchSlice";
import style from "./Modal.module.css";

function Modal() {
  const { selectId, nodeName, eventName, showModal } =
    useSelector(selectSwitch);
  const [name, setName] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();

  const [addNode, addNodeParam] = useAddNodeMutation();
  const [renameNode, editNodeParam] = useRenameNodeMutation();
  const [deleteNode, delNodeParam] = useDeleteNodeMutation();
  const headerName = useMemo(
    () =>
      eventName === "Add"
        ? "Create"
        : eventName === "Edit"
        ? "Rename"
        : eventName === "Del"
        ? "Delete"
        : "",
    [eventName]
  );
  const modalContent = useMemo(() => {
    if (isLoading) return <div className={style["animate-flicker"]}>Loading...</div>;
    if (isError)
      return <div className={style["error-message"]}>{errorMessage}</div>;
    if (isSuccess)
      return <div className={style["success-message"]}>{successMessage}</div>;
    if (!isLoading && !isError && !isSuccess && eventName === "Del")
      return <div>Are you sure that you want to delete node '{nodeName}'?</div>;
    if (!isLoading && !isError && !isSuccess && eventName !== "Del")
      return (
        <div className={style["form"]}>
          <label htmlFor="nodeName">Node name:</label>
          <input
            name="nodeName"
            autoComplete="off"
            onFocus
            onChange={(e) => setName(e.target.value)}
            defaultValue={eventName === "Edit" ? nodeName : ""}
          ></input>
        </div>
      );
  }, [
    isLoading,
    isError,
    isSuccess,
    eventName,
    errorMessage,
    successMessage,
    nodeName,
  ]);

  const handleClick = async () => {
    if (eventName === "Add")
      await addNode({
        parentNodeId: selectId,
        nodeName: name,
      }).unwrap();
    if (eventName === "Edit")
      await renameNode({
        nodeId: selectId,
        newNodeName: name,
      }).unwrap();
    if (eventName === "Del") await deleteNode(selectId).unwrap();
  };

  const handleClickCancel = () => {
    dispatch(setModal({ eventName: "", showModal: false }));
  };

  useEffect(() => {
    if (addNodeParam.isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    if (addNodeParam.isSuccess) {
      setSuccess(true);
      setSuccessMessage(`Node created successfully!`);
    }
    if (addNodeParam.isError) {
      setError(true);
      setErrorMessage(`Error! ${addNodeParam.error?.data?.data?.message}`);
    }
  }, [addNodeParam]);

  useEffect(() => {
    if (editNodeParam.isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    if (editNodeParam.isSuccess) {
      setSuccess(true);
      setSuccessMessage(`Node changed successfully!`);
    }
    if (editNodeParam.isError) {
      setError(true);
      setErrorMessage(`Error! ${editNodeParam.error?.data?.data?.message}`);
    }
  }, [editNodeParam]);

  useEffect(() => {
    if (delNodeParam.isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    if (delNodeParam.isSuccess) {
      setSuccess(true);
      setSuccessMessage(`Node '${nodeName}' deleted successfully!`);
    }
    if (delNodeParam.isError) {
      setError(true);
      setErrorMessage(`Error! ${delNodeParam.error?.data?.data?.message}`);
    }
  }, [delNodeParam, nodeName]);

  useEffect(() => {
    if (showModal) {
      setLoading(false);
      setError(false);
      setSuccess(false);
    }
  }, [showModal]);

  return (
    <div
      className={style.modal}
      style={{ display: `${showModal ? "flex" : "none"}` }}
    >
      <div className={style["modal-wrapp"]}>
        <div className={style["modal-header"]}>{headerName}</div>
        <div class={style["line"]}></div>
        <div className={style["modal-content"]}>{modalContent}</div>
        <div className={style["modal-footer"]}>
          <div class={style["line"]}></div>
          <button
            className={style["modal-footer-button"]}
            onClick={handleClickCancel}
          >
            Cancel
          </button>
          <button
            className={`${style["modal-footer-button"]} ${
              style[headerName.toLocaleLowerCase()]
            }`}
            onClick={handleClick}
          >
            {headerName}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
