// import React from "react";
// import "./detail.css";
// import { auth, db } from "../../lib/firebase";
// import { changeBlock } from "../../store/useChatStore";
// import { useDispatch, useSelector } from "react-redux";
// import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

// function Detail() {
//   const user = useSelector((state) => state.userChat.user);
//   const isCurrentUserBlocked = useSelector(
//     (state) => state.userChat.isCurrentUserBlocked
//   );
//   const isReceiverBlocked = useSelector(
//     (state) => state.userChat.isReceiverBlocked
//   );
//   const currentUser = useSelector((state) => state.userAuth.currentUser);
//   const dispatch = useDispatch();

//   const handleBlock = async () => {
//     if (!user) return;

//     const userDocRef = doc(db, "users", currentUser.id);
//     try {
//       await updateDoc(userDocRef, {
//         blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
//       });
//       dispatch(changeBlock());
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="detail">
//       <div className="user">
//         <img src={user?.avatar || "./avatar.png"} alt="" />
//         <h2>{user?.username || "Username"}</h2>
//         <p>
//           Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae?
//         </p>
//       </div>
//       <div className="info">
//         <div className="option">
//           <div className="title">
//             <span>Chat settings</span>
//             <img src="./arrowUp.png" alt="" />
//           </div>
//         </div>
//         <div className="option">
//           <div className="title">
//             <span>Privacy & help</span>
//             <img src="./arrowUp.png" alt="" />
//           </div>
//         </div>
//         <div className="option">
//           <div className="title">
//             <span>Shared Photos</span>
//             <img src="./arrowDown.png" alt="" />
//           </div>
//           <div className="photos">
//             <div className="photoItem">
//               <div className="photoDetail">
//                 <img src="avatar.png" alt="" width={"80px"} height={"80px"} />
//                 <span>photo_2024.png</span>
//               </div>
//               <img src="./download.png" alt="" className="icon" />
//             </div>
//             <div className="photoItem">
//               <div className="photoDetail">
//                 <img src="avatar.png" alt="" width={"80px"} height={"80px"} />
//                 <span>photo_2024.png</span>
//               </div>
//               <img src="./download.png" alt="" className="icon" />
//             </div>
//           </div>
//         </div>
//         <div className="option">
//           <div className="title">
//             <span>Shared Files</span>
//             <img src="./arrowUp.png" alt="" />
//           </div>
//         </div>
//         <button onClick={handleBlock}>
//           {isCurrentUserBlocked
//             ? "You are Blocked"
//             : isReceiverBlocked
//             ? "User Blocked / Click to UnBlock"
//             : "Block User"}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Detail;
