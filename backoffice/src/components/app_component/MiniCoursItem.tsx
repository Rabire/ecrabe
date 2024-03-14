const MiniCoursItem = () => {
  return (
    <div className="my-4">
      <div className="p-2 rounded-lg border border-slate-200 border-solid grid grid-cols-5">
        <div>
          <img
            src="https://images.unsplash.com/photo-1710092673366-68f0114d3db1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="image1"
            className="rounded"
          />
        </div>

        <div className="p-2">
          <h3 className="font-bold">Titre du cours</h3>
          <p>description du cours</p>
        </div>
      </div>
    </div>
  );
};

export default MiniCoursItem;
