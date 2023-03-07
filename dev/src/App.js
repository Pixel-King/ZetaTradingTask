import "./App.css";
import { useGetTreeQuery } from "./app/swagger/swagger.api";
import Modal from "./components/Modal/Modal";
// import Modal from "./components/Modal/Modal";
import Node from "./components/Node/Node";

// const data = {
//   id: 1,
//   name: "{C9232B85-AD10-459C-A44F-70CA30C60E5F}",
//   children: [
//     {
//       id: 866,
//       name: "Root 2",
//       children: [
//         {
//           id: 880,
//           name: "Root 3",
//           children: [
//             {
//               id: 892,
//               name: "Root 4",
//               children: [],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       id: 840,
//       name: "kmmmmmm3",
//       children: [
//         {
//           id: 972,
//           name: "hhhh",
//           children: [],
//         },
//         {
//           id: 973,
//           name: "lk",
//           children: [
//             {
//               id: 974,
//               name: "m,nmn",
//               children: [],
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };

function App() {
  const { data } = useGetTreeQuery();
  const deepCoef = 0;
  return (
    <div className="tree-wrap">
      <Node
        node={data}
        isRoot={true}
        childrenPosition={deepCoef}
        parentNodeId={data?.id}
      />
      <Modal />
    </div>
  );
}

export default App;
