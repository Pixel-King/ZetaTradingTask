import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddNodeMutation,
  useDeleteNodeMutation,
  useRenameNodeMutation,
} from "../../app/swagger/swagger.api";
import { selectSwitch, setModal } from "../Node/switchSlice";
import "./modal.css";

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

  const handelClickAdd = async () => {
    await addNode({
      parentNodeId: selectId,
      nodeName: name,
    }).unwrap();
  };

  const handelClickEdit = async () => {
    console.log(name);
    await renameNode({
      nodeId: selectId,
      newNodeName: name,
    }).unwrap();
  };
  const handelClickDel = async () => {
    await deleteNode(selectId).unwrap();
  };

  const handelClickCancel = () => {
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
      setSuccessMessage(`Node '${nodeName}'deleted successfully!`);
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
      className="modal"
      style={{ display: `${showModal ? "flex" : "none"}` }}
    >
      <div className="modal-wrapp">
        <div className="modal-header">
          {eventName === "Add"
            ? "Create"
            : eventName === "Edit"
            ? "Rename"
            : eventName === "Del"
            ? "Delete"
            : ""}
        </div>
        <div class="line"></div>
        <div className="modal-content">
          {isLoading && <div>Loading...</div>}
          {isError && <div>{errorMessage}</div>}
          {isSuccess && <div>{successMessage}</div>}
          {!isLoading && !isError && !isSuccess && eventName === "Del" && (
            <div>Are you sure that you want to delete node '{nodeName}'?</div>
          )}
          {!isLoading && !isError && !isSuccess && eventName !== "Del" && (
            <div className="form">
              <label htmlFor="nodeName">Node name:</label>
              <input
                name="nodeName"
                onChange={(e) => setName(e.target.value)}
                defaultValue={eventName === "Edit" ? nodeName : ""}
              ></input>
            </div>
          )}
        </div>
        <div class="line"></div>
        <div className="modal-footer">
          <button onClick={handelClickCancel}>Cancel</button>
          {eventName === "Add" && <button onClick={handelClickAdd}>Create</button>}
          {eventName === "Edit" && (
            <button onClick={handelClickEdit}>Rename</button>
          )}
          {eventName === "Del" && <button onClick={handelClickDel}>Del</button>}
        </div>
      </div>
    </div>
  );
}

export default Modal;
