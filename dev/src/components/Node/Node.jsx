import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNodeId, setModal, selectSwitch } from "./switchSlice";
import "./Node.css";
import AddIconSvg from "./icons/AddIcon";
import DelIcon from "./icons/DelIcon";
import EditIcon from "./icons/EditIcon";
import ArrowIcon from "./icons/ArrowIcon";

function Node({ node, isRoot, childrenPosition, parentNodeId }) {
  const { selectId } = useSelector(selectSwitch);
  const dispatch = useDispatch();
  const [showChildren, setShowChildren] = useState(false);
  const [showInterface, setShowInterface] = useState(false);

  function hundlClick(id) {
    dispatch(
      setNodeId({
        id: node?.id,
        parentNodeId: parentNodeId,
        nodeName: node?.name,
      })
    );
    if (node?.id === id) setShowInterface(true);
    if (node?.children?.length) setShowChildren(!showChildren);
  }

  const clickAddNode = () => {
    dispatch(setModal({ eventName: "Add", showModal: true }));
  };
  const clickEditNode = () => {
    dispatch(setModal({ eventName: "Edit", showModal: true }));
  };
  const clickDelNode = () => {
    dispatch(setModal({ eventName: "Del", showModal: true }));
  };

  useEffect(() => {
    if (selectId !== node?.id) setShowInterface(false);
  }, [selectId, node?.id, node]);

  childrenPosition++;
  return (
    <div
      className="tree-node"
      key={node?.id}
      style={{
        marginLeft: `${15 * childrenPosition}px`,
      }}
    >
      <div
        className={`tree-node-node ${showInterface? 'active-node' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          hundlClick(node?.id);
        }}
      >
        <div className="tree-node-name-container">
            {node?.children?.length > 0 && (
              <div className={`tree-node-icon ${showChildren ? "icon-mirror" : ""}`}><ArrowIcon /></div>
            )}
          <div className="tree-node-name">{isRoot ? "Root" : node.name}</div>
        </div>
        <div className="tree-node-interface">
          {showInterface && (
            <>
              <div
                className="tree-node-interface-element button-add"
                onClick={clickAddNode}
              >
                <AddIconSvg />
              </div>
              {!isRoot && (
                <>
                  <div
                    className="tree-node-interface-element button-edit"
                    onClick={clickEditNode}
                  >
                    <EditIcon />
                  </div>
                  <div
                    className="tree-node-interface-element button-delete"
                    onClick={clickDelNode}
                  >
                    <DelIcon />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      {showChildren && (
        <div className="tree-node-childern">
          {node?.children?.length > 0 &&
            node.children.map((el, idx) => (
              <Node
                node={el}
                isRoot={false}
                key={idx}
                childrenPosition
                parentNodeId={node?.id}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default Node;
