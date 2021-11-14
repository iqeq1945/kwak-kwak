export const Test = async (req, res, next) => {
  try {
    //console.log(getConnection);
    return "success";
  } catch (err) {
    console.error(err);
    next(err);
  }
};
