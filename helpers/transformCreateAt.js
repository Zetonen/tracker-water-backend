const transformCreateAt = at => {
  return at.toLocaleString().split(",")[0].split("/").reverse().join("-");
  //   внизу для локального
  //   return at.toLocaleString().split(",")[0].split(".").reverse().join("-"); 
};
export default transformCreateAt;
