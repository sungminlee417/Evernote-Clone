import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearNotebooks, loadNotebooksThunk } from "../../store/notebooks";
import CreateNotebookModal from "./CreateNotebookModal";
import IndividualNotebook from "./IndividualNotebook";

const DisplayNotebooks = () => {
  const dispatch = useDispatch();
  const notebooks = Object.values(useSelector((state) => state.notebooks));

  useEffect(() => {
    dispatch(loadNotebooksThunk());

    return () => dispatch(clearNotebooks());
  }, [dispatch]);

  return (
    <div className="grow md:p-8 p-6 lg:mt-0 mt-20 overflow-y-auto flex flex-col gap-20">
      <div>
        <div className="text-[#383434] text-4xl">Notebooks</div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="font-bold text-2xl">
            {notebooks.length}{" "}
            {notebooks.length == 1 ? "notebook" : "notebooks"}{" "}
          </div>
          <div>
            <CreateNotebookModal />
          </div>
        </div>
        <div className="border-t-2 border-t-[#606c6c]">
          <div className="grid grid-cols-[4fr_3fr_2fr_1fr] p-4 bg-[#f8f8f8] text-lg text-[#b8b4b4] border-b border-b-[#f4f4f4]">
            <button className="text-left">TITLE</button>
            <div className="text-left">CREATED BY</div>
            <button className="text-left">UPDATED</button>
            <div className="text-right">ACTIONS</div>
          </div>
          <ul>
            {notebooks.reverse().map((notebook, i) => {
              return (
                <li key={notebook.id}>
                  <IndividualNotebook notebook={notebook} index={i} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default DisplayNotebooks;
