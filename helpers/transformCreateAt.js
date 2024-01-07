const transformCreateAt = at => {
  return at.toLocaleString({}, {
    dateStyle: "short",
    timeStyle: "short"
  })
  // return at.toLocaleString().split(",")[0].split(".").reverse().join("-");
};
export default transformCreateAt;
