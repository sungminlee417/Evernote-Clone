import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNotebook } from "../../../store/notebooks";

const CreateNotebook = ({ onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);
  const notebooks = Object.values(useSelector((state) => state.notebooks));

  const submit = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(createNotebook(name))
      .then(() => onClose())
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors[1]);
        }
      });
  };

  useEffect(() => {
    setErrors("");
    notebooks.forEach((notebookObj) => {
      if (notebookObj.name === name)
        setErrors(`Notebook name '${name}' is already in use`);
    });
  }, [name, notebooks]);

  return (
    <>
      <div
        className="bg-white rounded-md border-[#d8d4d4] border shadow-md flex flex-col md:m-0 m-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-8 md:p-8 p-6">
          <div className="flex justify-between">
            <div className="text-3xl font-bold">Create new notebook</div>
            <button
              onClick={() => {
                onClose();
              }}
              className="text-3xl"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="text-[#787474] text-xl">
            Notebooks are useful for grouping notes around a common topic. They
            can be private or shared.
          </div>
        </div>
        <form onSubmit={submit}>
          <div className="md:p-8 p-6 flex flex-col gap-4">
            <input
              id="create-notebook-name"
              className="w-full border border-[#d8d4d4] rounded-sm outline-none p-4 text-xl focus:border-[#2596be]"
              type="text"
              placeholder="Notebook name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p className="text-[#ff7474]">{errors}</p>
          </div>
          <div className="flex justify-end border-t-[#ababab] border-t md:p-8 p-6 gap-4">
            <button
              className="rounded-md w-36 py-4 md:text-2xl text-xl bg-transparent text-[#787474] hover:text-[#504c4c] hover:bg-[#f8f4f4] border border-[#787474] hover:border-[#504c4c]"
              type="button"
              onClick={() => {
                onClose();
              }}
            >
              Cancel
            </button>
            <button
              className={`rounded-md w-36 py-4 md:text-2xl text-xl text-white ${
                errors.length
                  ? "border border-[#d0cccc] text-white bg-[#d0cccc]"
                  : "bg-[#08a42c] hover:bg-[#088c24]"
              }`}
              disabled={errors.length}
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateNotebook;
